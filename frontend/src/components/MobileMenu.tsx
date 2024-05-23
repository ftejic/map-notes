import { motion } from "framer-motion";
import { MapIcon, MapPinIcon, PencilLineIcon, Settings } from "lucide-react";

function MobileMenu() {
  return (
    <div className="flex sm:hidden fixed w-full bottom-0 py-4 border-t-2">
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 flex flex-col items-center"
      >
        <MapIcon className="text-foreground" />
        <p>Map</p>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 flex flex-col items-center"
      >
        <MapPinIcon className="text-foreground" />
        <p>Places</p>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 flex flex-col items-center"
      >
        <PencilLineIcon className="text-foreground" />
        <p>Add</p>
      </motion.div>
      <motion.div
        whileTap={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-1/4 flex flex-col items-center"
      >
        <Settings className="text-foreground" />
        <p>Settings</p>
      </motion.div>
    </div>
  );
}

export default MobileMenu;
