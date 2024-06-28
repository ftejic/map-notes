import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectUserUID } from "@/redux/authSlice";
import { selectToken } from "@/redux/authSlice";
import { RootState } from "./store";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseStorage } from "@/firebase/firebase";
import imageCompression from "browser-image-compression";

interface AsyncThunkConfig {
  rejectValue: string;
}

interface VisitedPlace {
  _id: string;
  placeName: string;
  arrivalDate: Date;
  departureDate: Date;
  ratings: {
    food: number;
    prices: number;
    attractions: number;
    nightlife: number;
    overall: number;
  };
  notes: string;
  images: string[];
}

interface PlacesState {
  visitedPlaces: VisitedPlace[] | null;
  loading: boolean;
  error: string | null;
}

interface AddPlacePayload {
  placeName: string;
  arrivalDate: Date | undefined;
  departureDate: Date | undefined;
  foodRating: number;
  pricesRating: number;
  attractionsRating: number;
  nightlifeRating: number;
  overall: number;
  notes: string;
  images: (File | null)[];
}

interface DeletePlacePayload {
  _id: string;
  images: string[];
}

export const getPlaces = createAsyncThunk<
  VisitedPlace[],
  void,
  AsyncThunkConfig
>("places/getPlaces", async (_, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const userUID = selectUserUID(state);
  const token = selectToken(state);

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/places/get-places/${userUID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const compressImage = async (image: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  };
  try {
    const compressedImage = await imageCompression(image, options);
    return compressedImage;
  } catch (error) {
    console.error("Error during image compression: ", error);
    throw error;
  }
};

export const uploadImages = createAsyncThunk<
  string[],
  File[],
  AsyncThunkConfig
>("places/uploadImages", async (images, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const userUID = selectUserUID(state);

  try {
    const uploadImage = async (image: File): Promise<string> => {
      const compressedImage = await compressImage(image); // Kompresujte sliku pre uploadovanja
      const name = new Date().getTime() + compressedImage.name;
      const storageRef = ref(
        firebaseStorage,
        `Places Images/${userUID}/${name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, compressedImage);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error: ", error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    };

    const urls = await Promise.all(images.map(uploadImage));
    return urls;
  } catch (error) {
    console.error("Error uploading images: ", error);
    return rejectWithValue((error as Error).message);
  }
});

const deleteImages = async (images: string[]) => {
  try {
    const deletePromises = images.map(async (image) => {
      const storageRef = ref(firebaseStorage, image);

      await deleteObject(storageRef);
    });

    await Promise.all(deletePromises);
    console.log("All images deleted from Storage.");
  } catch (error) {
    console.error("Error deleting images: ", error);
  }
};

export const addPlace = createAsyncThunk<
  VisitedPlace,
  AddPlacePayload,
  AsyncThunkConfig
>(
  "places/addPlace",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const userUID = selectUserUID(state);
    const token = selectToken(state);

    const {
      placeName,
      arrivalDate,
      departureDate,
      foodRating,
      pricesRating,
      attractionsRating,
      nightlifeRating,
      notes,
      images,
      overall,
    } = payload;

    const filteredImages: File[] = images.filter(
      (image): image is File => image !== null
    );
    const isoArrivalDate = arrivalDate?.toISOString();
    const isoDepartureDate = departureDate?.toISOString();

    try {
      let imageURLS: string[] = [];

      if (filteredImages.length > 0) {
        imageURLS = await dispatch(uploadImages(filteredImages)).unwrap();
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/places/add-place`,
        {
          userUID,
          placeName,
          arrivalDate: isoArrivalDate,
          departureDate: isoDepartureDate,
          ratings: {
            food: foodRating,
            prices: pricesRating,
            attractions: attractionsRating,
            nightlife: nightlifeRating,
            overall,
          },
          notes,
          images: imageURLS,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to add place to database:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deletePlace = createAsyncThunk<
  string,
  DeletePlacePayload,
  AsyncThunkConfig
>(
  "places/deletePlace",
  async (DeletePlacePayload, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = selectToken(state);

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/places/delete-place/${
          DeletePlacePayload._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await deleteImages(DeletePlacePayload.images);

      return DeletePlacePayload._id;
    } catch (error) {
      console.error("Failed to delete place", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: PlacesState = {
  visitedPlaces: null,
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPlaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPlaces.fulfilled,
        (state, action: PayloadAction<VisitedPlace[]>) => {
          state.loading = false;
          state.visitedPlaces = action.payload;
        }
      )
      .addCase(
        getPlaces.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to get places";
        }
      )
      .addCase(
        addPlace.fulfilled,
        (state, action: PayloadAction<VisitedPlace>) => {
          state.visitedPlaces = state.visitedPlaces
            ? [...state.visitedPlaces, action.payload]
            : [action.payload];
        }
      )
      .addCase(
        addPlace.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add place";
        }
      )
      .addCase(
        deletePlace.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.visitedPlaces = (state.visitedPlaces || []).filter(
            (place) => place._id !== action.payload
          );
        }
      )
      .addCase(
        deletePlace.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to delete place";
        }
      );
  },
});

export default placesSlice.reducer;
