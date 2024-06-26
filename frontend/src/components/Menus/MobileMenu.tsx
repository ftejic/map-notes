import { motion } from "framer-motion";
import { MapIcon, MapPinIcon, PencilLineIcon, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function MobileMenu() {
  const location = useLocation();

  return (
    <div className="flex sm:hidden absolute w-full bottom-0 border-t bg-background text-base">
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 "
      >
        <Link to="/" className="w-full flex flex-col items-center pb-4 pt-2">
          <div
            className={`${
              location.pathname === "/" && "bg-primary/20"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <MapIcon
              className={`${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-foreground"
              }  w-5 h-5`}
            />
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
              location.pathname === "/places" && "bg-primary/20"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <MapPinIcon
              className={`${
                location.pathname === "/places"
                  ? "text-primary"
                  : "text-foreground"
              } w-5 h-5`}
            />
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
              location.pathname === "/add" && "bg-primary/20"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <PencilLineIcon
              className={`${
                location.pathname === "/add"
                  ? "text-primary"
                  : "text-foreground"
              } w-5 h-5`}
            />
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
              location.pathname === "/settings" && "bg-primary/20"
            }  py-1 px-3 rounded-md transition-colors duration-200 ease-in-out`}
          >
            <Settings
              className={`${
                location.pathname === "/settings"
                  ? "text-primary"
                  : "text-foreground"
              } w-5 h-5`}
            />
          </div>
          <p>Settings</p>
        </Link>
      </motion.div>
    </div>
  );
}

export default MobileMenu;
