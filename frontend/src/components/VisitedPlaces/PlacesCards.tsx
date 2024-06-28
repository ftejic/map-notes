import PlacesCard from "@/components/VisitedPlaces/PlacesCard.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const PlacesCards = () => {
  const visitedPlaces = useSelector((state: RootState) => state.places.visitedPlaces);

  return (
    <ScrollArea className="h-[calc(100vh-120px-78px)] sm:h-[calc(100vh-120px)] p-4 pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
        {visitedPlaces?.map((place) => (
          <PlacesCard
            key={place._id}
            _id={place._id}
            placeName={place.placeName}
            arrivalDate={place.arrivalDate}
            departureDate={place.departureDate}
            overall={place.ratings.overall}
            images={place.images}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default PlacesCards;
