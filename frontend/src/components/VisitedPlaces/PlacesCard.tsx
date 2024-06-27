import { Card, CardContent } from "@/components/ui/card.tsx";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "../ui/use-toast";
import { deletePlace } from "@/redux/placesSlice";

interface PlacesCardProps {
  _id: string;
  placeName: string;
  arrivalDate: Date;
  departureDate: Date;
  overall: number;
}

const PlacesCard = ({
  _id,
  placeName,
  arrivalDate,
  departureDate,
  overall,
}: PlacesCardProps) => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  function formatDate(isoDateStr: Date) {
    const date = new Date(isoDateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  const handleDeletePlace = async () => {
    dispatch(deletePlace(_id))
      .then(() => {
        toast({ description: "Place deleted successfully!" });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Place deleted successfully!",
        });
      }).finally(() => {
        setDeleteDialogVisible(false)
      });
  };

  return (
    <>
      <ContextMenu modal={false}>
        <ContextMenuTrigger>
          <Link to={`/place/${_id}`}>
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
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setDeleteDialogVisible(true)}>
            Delete Place
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AlertDialog
        open={deleteDialogVisible}
        onOpenChange={setDeleteDialogVisible}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Place</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this place? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={"destructive"} onClick={handleDeletePlace}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PlacesCard;
