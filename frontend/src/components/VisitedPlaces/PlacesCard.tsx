import {Card, CardContent} from "@/components/ui/card.tsx";
import {StarIcon} from "lucide-react";

const PlacesCard = () => {
    return (
        <Card className="hover:bg-muted transition-colors duration-200 cursor-pointer">
            <CardContent className="p-4 flex justify-between items-center gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">Jabucje, Srbija</p>
                    <p className="text-sm">Jan 20, 2023 - Feb 09, 2023</p>
                </div>
                <div className="flex gap-1">
                    <StarIcon className="text-foreground"/>
                    4.5
                </div>
            </CardContent>
        </Card>
    );
};

export default PlacesCard;