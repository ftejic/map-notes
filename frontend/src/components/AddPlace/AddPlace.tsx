import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import Editor from "../RichText/Editor";
import AddImages from "./AddImages";
import Ratings from "./Ratings";
import Dates from "./Dates";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addPlace } from "@/redux/placesSlice";
import { toast } from "../ui/use-toast";

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
  const editorRef = useRef<any>(null);

  const dispatch: AppDispatch = useDispatch();

  const handleAddPlace = () => {
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

    const overall = (
      (foodRating + pricesRating + attractionsRating + nightlifeRating) /
      4
    ).toFixed(1);

    const payload = {
      placeName,
      arrivalDate,
      departureDate,
      foodRating,
      pricesRating,
      attractionsRating,
      nightlifeRating,
      notes,
      images,
      overall: Number(overall),
    };

    dispatch(addPlace(payload)).then(() => {
      setUploading(false);
      setPlaceName("");
      setArrivalDate(undefined);
      setDepartureDate(undefined);
      setFoodRating(1);
      setPricesRating(1);
      setAttractionsRating(1);
      setNightlifeRating(1);
      setNotes("");
      setImages([null, null, null, null]);

      if (editorRef.current) {
        editorRef.current.resetContent();
      }

      toast({
        variant: "default",
        description: "Place added successfully!",
      });
    });
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
              <Editor ref={editorRef} content={notes} onChange={setNotes} />
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
