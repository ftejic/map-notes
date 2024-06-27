import { RootState } from "@/redux/store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Rating } from "../ui/rating";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImagePlaceholder from "@/assets/images/ImagePlaceholder.png";
import { Link } from "react-router-dom";

interface Place {
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

function Place() {
  const { placeId } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editorContent, setEditorContent] = useState<string>("");

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/places/get-place/${placeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlace(response.data);
        setEditorContent(response.data.notes);
      } catch (error) {
        setError((error as Error).message);
      }
      setLoading(false);
    };

    getPlace();
  }, [placeId]);

  const editor = useEditor({
    editable: false,
    content: editorContent,
    extensions: [StarterKit],
  });

  useEffect(() => {
    if (editor && editorContent) {
      editor.commands.setContent(editorContent);
    }
  }, [editor, editorContent]);

  if (loading || !editor) {
    return (
      <div className="md:grid md:grid-cols-4 lg:grid-cols-5">
        <div className="sm:ml-14 md:ml-0 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-6 flex items-center justify-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (error.length > 0 || !place) {
    return (
      <div className="md:grid md:grid-cols-4 lg:grid-cols-5">
        <div className="sm:ml-14 md:ml-0 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-6 flex items-center justify-center h-screen">
          <p>No place found</p>
        </div>
      </div>
    );
  }

  const getOrdinal = (n: number) => {
    return `${n}${
      ["th", "st", "nd", "rd"][((n % 100) - 20) % 10] ||
      ["th", "st", "nd", "rd"][n % 100] ||
      "th"
    }`;
  };

  const formatDate = (dateInput: Date | string) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = getOrdinal(date.getDate());
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="Place md:grid md:grid-cols-4 lg:grid-cols-5">
      <div className="sm:ml-14 md:ml-0 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-6">
        <h1 className="text-center text-2xl font-bold p-4 border-b-2">Place</h1>
        <ScrollArea className="h-[calc(100vh-66px-78px)] sm:h-[calc(100vh-66px)]">
          <div className="p-4">
            <div>
              <p className="font-bold">{place.placeName}</p>
              <p className="text-sm">
                {formatDate(place.arrivalDate)} -{" "}
                {formatDate(place.departureDate)}
              </p>
            </div>
            <div className="grid grid-cols-1 min-[670px]:grid-cols-2 gap-4 text-base mt-5">
              {Object.entries(place.ratings)
                .filter(([category]) => category !== "overall")
                .map(([category, rating]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3"
                  >
                    <p className="capitalize">{category}</p>
                    <Rating rating={rating} size={30} readOnly />
                  </div>
                ))}
            </div>
            <div className="mt-10">
              <EditorContent editor={editor} />
            </div>
            {place.images.length > 0 && (
              <div className="flex justify-center w-full px-12 mt-20">
                <Carousel className="w-full max-w-screen-md">
                  <CarouselContent>
                    {place.images.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 flex items-center justify-center">
                        <Link to={image} target="_blank">
                          <LazyLoadImage
                            placeholder={
                              <div className="w-52 h-52 sm:w-80 sm:h-80">
                                <img src={ImagePlaceholder} alt="" />
                              </div>
                            }
                            src={image}
                            className="max-h-80"
                          />
                        </Link>
                        
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Place;
