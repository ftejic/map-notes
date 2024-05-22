import { useAuth0 } from "@auth0/auth0-react";
import {
  MapIcon,
  MapPinIcon,
  PencilLineIcon,
  Settings,
  LogOutIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function SideMenu() {
  const { logout } = useAuth0();

  return (
    <div className="hidden sm:flex flex-col h-screen w-fit md:w-56 lg:w-72 border-r-2">
      <div className="p-4 border-b-2">
        <p className="hidden md:block font-anton-regular text-2xl text-primary">
          MapNotes
        </p>
        <p className="md:hidden font-anton-regular text-2xl text-primary text-center">
          M
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2 py-4">
        <div className="p-2 rounded-md cursor-pointer hover:bg-accent ">
          <div className="hidden md:flex gap-2">
            <MapIcon className="text-foreground" />
            <p>Travel Map</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden">
                <MapIcon className="text-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Travel Map</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="p-2 rounded-md cursor-pointer hover:bg-accent ">
          <div className="hidden md:flex gap-2">
            <MapPinIcon className="text-foreground" />
            <p>Visited Places</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden">
                <MapPinIcon className="text-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Visited Places</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="p-2 rounded-md cursor-pointer hover:bg-accent ">
          <div className="hidden md:flex gap-2">
            <PencilLineIcon className="text-foreground" />
            <p>Add Entry</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden">
                <PencilLineIcon className="text-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Entry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="p-2 rounded-md cursor-pointer hover:bg-accent ">
          <div className="hidden md:flex gap-2">
            <Settings className="text-foreground" />
            <p>Settings</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden">
                <Settings className="text-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="mt-auto p-4 border-t-2 cursor-pointer hover:bg-accent"
      >
        <div className="hidden md:flex gap-2">
          <LogOutIcon className="text-foreground" />
          <p>Log Out</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="block md:hidden">
              <LogOutIcon className="text-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default SideMenu;
