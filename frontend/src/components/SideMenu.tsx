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
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SideMenu() {
  const { logout } = useAuth0();

  return (
    <div className="hidden sm:flex flex-col fixed min-h-screen w-fit md:w-1/4 lg:w-1/5 border-r-2">
      <div className="p-4 border-b-2">
        <p className="hidden md:block font-anton-regular text-2xl text-primary">
          MapNotes
        </p>
        <p className="md:hidden font-anton-regular text-2xl text-primary text-center">
          M
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2 py-4">
        <div className="cursor-pointer hover:bg-accent rounded-md">
          <motion.div
            className="hidden md:flex w-full "
            whileHover={{ x: 3 }}
            whileTap={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex w-full h-full gap-2 p-2">
              <MapIcon className="text-foreground" />
              <p>Travel Map</p>
            </Link>
          </motion.div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden p-2">
                <Link to="/">
                  <MapIcon className="text-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Travel Map</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="cursor-pointer hover:bg-accent rounded-md">
          <motion.div
            className="hidden md:flex w-full"
            whileHover={{ x: 3 }}
            whileTap={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/places" className="flex w-full h-full gap-2 p-2">
              <MapPinIcon className="text-foreground" />
              <p>Visited Places</p>
            </Link>
          </motion.div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden p-2">
                <Link to="/places">
                  <MapPinIcon className="text-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visited Places</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="cursor-pointer hover:bg-accent rounded-md">
          <motion.div
            className="hidden md:flex w-full"
            whileHover={{ x: 3 }}
            whileTap={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/add" className="flex w-full h-full gap-2 p-2">
              <PencilLineIcon className="text-foreground" />
              <p>Add Entry</p>
            </Link>
          </motion.div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden p-2">
                <Link to="/add">
                  <PencilLineIcon className="text-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Entry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="cursor-pointer hover:bg-accent rounded-md">
          <motion.div
            className="hidden md:flex w-full"
            whileHover={{ x: 3 }}
            whileTap={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/settings" className="flex w-full h-full gap-2 p-2">
              <Settings className="text-foreground" />
              <p>Settings</p>
            </Link>
          </motion.div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="block md:hidden p-2">
                <Link to="/settings">
                  <Settings className="text-foreground" />
                </Link>
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
        className="mt-auto border-t-2 cursor-pointer hover:bg-accent"
      >
        <motion.div
          className="hidden md:flex w-full gap-2 p-4"
          whileHover={{ x: 3 }}
          whileTap={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LogOutIcon className="text-foreground" />
          <p>Log Out</p>
        </motion.div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="block md:hidden p-4">
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
