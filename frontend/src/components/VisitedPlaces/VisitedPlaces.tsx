import PlacesCards from "@/components/VisitedPlaces/PlacesCards.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SearchIcon, XIcon} from "lucide-react";
import {useState} from "react";

function VisitedPlaces() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="md:grid md:grid-cols-4 lg:grid-cols-5 sm:h-full max-h-screen">
            <div className="sm:ml-14 md:ml-0 md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-6">
                <div className="flex flex-col items-center p-4 gap-4">
                    <h1 className="text-center text-2xl font-bold">Visited Places</h1>
                    <div className="relative w-full max-w-xl">
                        <SearchIcon className="w-4 h-4 absolute top-3 left-3 text-muted-foreground"/>
                        <Input type="text" placeholder="Search destinations" value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)} className="px-10 bg-card text-card-foreground"/>
                        {
                            searchValue.length > 0 &&
                            <XIcon onClick={() => setSearchValue("")} className="w-4 h-4 absolute top-3 right-3 text-muted-foreground cursor-pointer"/>
                        }
                    </div>
                </div>
                <PlacesCards/>
            </div>
        </div>
    );
}

export default VisitedPlaces;
