import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import Editor from "../RichText/Editor";
import AddImages from "./AddImages";
import Ratings from "./Ratings";
import Dates from "./Dates";
import { useToast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { firebaseStorage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Loader2 } from "lucide-react";

function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>();
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [foodRating, setFoodRating] = useState(1);
  const [pricesRating, setPricesRating] = useState(1);
  const [attractionsRating, setAttractionsRating] = useState(1);
  const [nightlifeRating, setNightlifeRating] = useState(1);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [uploading, setUploading] = useState(false);

  const { user, token } = useSelector((state: RootState) => state.auth);

  const { toast } = useToast();

  const uploadImages = async (images: File[]) => {
    setUploading(true);
    try {
      const urls = await Promise.all(
        images.map(async (image) => {
          const name = new Date().getTime() + image.name;
          const storageRef = ref(
            firebaseStorage,
            `Places Images/${user?.uid}/${name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              let progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(`Upload is ${progress}% done`);

              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.log(error);
            }
          );

          await uploadTask;
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          return downloadURL;
        })
      );

      return urls;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlace = async () => {
    if (!placeName || placeName.length === 0) {
      toast({
        variant: "destructive",
        description: "Place name is required.",
      });
      return;
    }

    if (!arrivalDate) {
      toast({
        variant: "destructive",
        description: "Arrival date is required.",
      });
      return;
    }

    if (!departureDate) {
      toast({
        variant: "destructive",
        description: "Deparature date is required.",
      });
      return;
    }

    const currentDate = new Date();

    if (arrivalDate > currentDate) {
      toast({
        variant: "destructive",
        description: "Arrival date should not be in the future.",
      });
      return;
    }

    if (departureDate > currentDate) {
      toast({
        variant: "destructive",
        description: "Departure date should not be in the future.",
      });
      return;
    }

    if (departureDate < arrivalDate) {
      toast({
        variant: "destructive",
        description: "Deparature date shold be after arrival date.",
      });
      return;
    }

    const text = notes.replace(/<\/?[^>]+(>|$)/g, "").trim();

    if (!notes || notes.length === 0 || text.length === 0) {
      toast({
        variant: "destructive",
        description: "Notes is required.",
      });
      return;
    }

    const filteredImages: File[] = images.filter(
      (image): image is File => image !== null
    );
    const overall = (
      (foodRating + pricesRating + attractionsRating + nightlifeRating) /
      4
    ).toFixed(1);
    const isoArrivalDate = arrivalDate.toISOString();
    const isoDepartureDate = departureDate.toISOString();

    try {
      let imageURLS: string[] | undefined = [];

      if (filteredImages.length > 0) {
        imageURLS = await uploadImages(filteredImages);
      }

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/places/add-place`,
        {
          userUID: user?.uid,
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
    } catch (error) {
      console.error("Failed to add user to database:", error);
    }
    setUploading(false);
  };

  return (
    <div className="md:grid md:grid-cols-4 lg:grid-cols-5">
      <div className="sm:ml-14 md:ml-0 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-6">
        <h1 className="text-center text-2xl font-bold p-4">Add Places</h1>
        <ScrollArea className="h-[calc(100vh-64px-86px)] sm:h-[calc(100vh-64px)]">
          <div className="p-4 max-w-screen-md relative left-1/2 -translate-x-1/2">
            <div>
              <Label htmlFor="placeName">Place Name</Label>
              <Input
                type="text"
                id="placeName"
                placeholder="e.g. Paris"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Dates
                arrivalDate={arrivalDate}
                setArrivalDate={setArrivalDate}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
              />
            </div>
            <div className="mt-10">
              <Ratings
                foodRating={foodRating}
                setFoodRating={setFoodRating}
                pricesRating={pricesRating}
                setPricesRating={setPricesRating}
                attractionsRating={attractionsRating}
                setAttractionsRating={setAttractionsRating}
                nightlifeRating={nightlifeRating}
                setNightlifeRating={setNightlifeRating}
              />
            </div>
            <div className="mt-10">
              <p className="mb-1">Notes</p>
              <Editor content={notes} onChange={setNotes} />
            </div>
            <div className="mt-10">
              <AddImages images={images} setImages={setImages} />
            </div>
            <div className="mt-10">
              {uploading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={handleAddPlace}>Add Place</Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AddPlace;
