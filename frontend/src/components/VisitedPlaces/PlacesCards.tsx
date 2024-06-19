import PlacesCard from "@/components/VisitedPlaces/PlacesCard.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const PlacesCards = () => {
    return (
        <ScrollArea className="h-[calc(100vh-122px-86px)] sm:h-[calc(100vh-120px)] p-4 pb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
                <PlacesCard/>
            </div>
        </ScrollArea>
    );
};

export default PlacesCards;