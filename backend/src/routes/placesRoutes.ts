import express from "express";
import {
  addPlace,
  getPlaces,
  getPlace,
  deletePlace,
} from "../controllers/placesController";

const router = express.Router();

router.route("/get-places/:userUID").get(getPlaces);
router.route("/add-place").post(addPlace);
router.route("/get-place/:placeId").get(getPlace);
router.route("/delete-place/:placeId").delete(deletePlace);

export default router;
