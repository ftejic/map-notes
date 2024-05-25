import { motion } from "framer-motion";
import { MapIcon, MapPinIcon, PencilLineIcon, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function MobileMenu() {
  const location = useLocation();

  return (
    <div className="flex sm:hidden fixed w-full bottom-0 border-t-2">
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 "
      >
        <Link to="/" className="w-full flex flex-col items-center pb-4 pt-2">
          <div
            className={`${
              location.pathname === "/" && "bg-primary"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <MapIcon className="text-foreground" />
          </div>
          <p>Map</p>
        </Link>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4"
      >
        <Link
          to="/places"
          className="w-full flex flex-col items-center pb-4 pt-2"
        >
          <div
            className={`${
              location.pathname === "/places" && "bg-primary"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <MapPinIcon className="text-foreground" />
          </div>
          <p>Places</p>
        </Link>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4"
      >
        <Link to="/add" className="w-full flex flex-col items-center pb-4 pt-2">
          <div
            className={`${
              location.pathname === "/add" && "bg-primary"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <PencilLineIcon className="text-foreground" />
          </div>
          <p>Add</p>
        </Link>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4"
      >
        <Link
          to="/settings"
          className="w-full flex flex-col items-center pb-4 pt-2"
        >
          <div
            className={`${
              location.pathname === "/settings" && "bg-primary"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <Settings className="text-foreground" />
          </div>
          <p>Settings</p>
        </Link>
      </motion.div>
    </div>
  );
}

export default MobileMenu;
