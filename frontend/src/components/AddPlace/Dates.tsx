import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface DatesProps {
  arrivalDate: Date | undefined;
  setArrivalDate: (value: Date | undefined) => void;
  departureDate: Date | undefined;
  setDepartureDate: (value: Date | undefined) => void;
}

function Dates({
  arrivalDate,
  setArrivalDate,
  departureDate,
  setDepartureDate,
}: DatesProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
      <div className="sm:w-1/2">
        <Label>Arrival Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !arrivalDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {arrivalDate ? (
                format(arrivalDate, "PPP")
              ) : (
                <span>Pick an arrival date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={arrivalDate}
              onSelect={setArrivalDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="sm:w-1/2">
        <Label>Departure Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !departureDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? (
                format(departureDate, "PPP")
              ) : (
                <span>Pick a departure date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={setDepartureDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Dates;
