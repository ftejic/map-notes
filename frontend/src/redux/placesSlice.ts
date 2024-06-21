import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectUserUID } from "@/redux/authSlice";
import { selectToken } from "@/redux/authSlice";
import { RootState } from "./store";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "@/firebase/firebase";

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

export const uploadImages = createAsyncThunk<
  string[],
  File[],
  AsyncThunkConfig
>("places/uploadImages", async (images, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const userUID = selectUserUID(state);

  try {
    const urls = await Promise.all(
      images.map(async (image) => {
        const name = new Date().getTime() + image.name;
        const storageRef = ref(
          firebaseStorage,
          `Places Images/${userUID}/${name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              let progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            () => {
              resolve();
            }
          );
        });

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL;
      })
    );

    return urls;
  } catch (error) {
    console.log(error);
    return rejectWithValue((error as Error).message);
  }
});

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
      overall
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
      .addCase(addPlace.fulfilled, (state, action: PayloadAction<VisitedPlace>) => {
        state.visitedPlaces = state.visitedPlaces ? [...state.visitedPlaces, action.payload] : [action.payload];
      })
      .addCase(
        addPlace.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add place";
        }
      );
  },
});

export default placesSlice.reducer;
