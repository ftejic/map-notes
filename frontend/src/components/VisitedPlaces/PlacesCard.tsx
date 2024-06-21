import { Card, CardContent } from "@/components/ui/card.tsx";
import { StarIcon } from "lucide-react";

interface PlacesCardProps {
  _id: string;
  placeName: string;
  arrivalDate: Date;
  departureDate: Date;
  overall: number;
}

const PlacesCard = ({
  placeName,
  arrivalDate,
  departureDate,
  overall,
}: PlacesCardProps) => {
  function formatDate(isoDateStr: Date) {
    const date = new Date(isoDateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <Card className="hover:bg-muted transition-colors duration-200 cursor-pointer">
      <CardContent className="p-4 flex justify-between items-center gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{placeName}</p>
          <p className="text-sm">
            {formatDate(arrivalDate)} - {formatDate(departureDate)}
          </p>
        </div>
        <div className="flex gap-1">
          <StarIcon className="text-foreground" />
          {overall}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacesCard;
