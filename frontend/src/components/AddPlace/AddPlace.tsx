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

function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>();
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [foodRate, setFoodRate] = useState(1);
  const [pricesRate, setPricesRate] = useState(1);
  const [attractionsRate, setAttractionsRate] = useState(1);
  const [nightlifeRate, setNightlifeRate] = useState(1);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<File[] | null>(null);

  const { toast } = useToast();

  const handleAddPlace = async () => {
    if (!placeName || placeName.length === 0) {
      toast({
        variant: "destructive",
        description: "Place name is required.",
      });
    } else if (!arrivalDate) {
      toast({
        variant: "destructive",
        description: "Arrival date is required.",
      });
    } else if (!departureDate) {
      toast({
        variant: "destructive",
        description: "Deparature date is required.",
      });
    }
    console.log(
      placeName,
      arrivalDate,
      departureDate,
      foodRate,
      pricesRate,
      attractionsRate,
      nightlifeRate,
      notes,
      images
    );
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
                foodRate={foodRate}
                setFoodRate={setFoodRate}
                pricesRate={pricesRate}
                setPricesRate={setPricesRate}
                attractionsRate={attractionsRate}
                setAttractionsRate={setAttractionsRate}
                nightlifeRate={nightlifeRate}
                setNightlifeRate={setNightlifeRate}
              />
            </div>
            <div className="mt-10">
              <p className="mb-1">Notes</p>
              <Editor content={notes} onChange={setNotes} />
            </div>
            <div className="mt-10">
              <AddImages />
            </div>
            <div className="mt-10">
              <Button onClick={handleAddPlace}>Add Place</Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AddPlace;
