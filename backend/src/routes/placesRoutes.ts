import express from "express";
import { addPlace, getPlaces, getPlace } from "../controllers/placesController";

const router = express.Router();

router.route("/get-places/:userUID").get(getPlaces);
router.route("/add-place").post(addPlace);
router.route("/get-place/:placeId").get(getPlace);

export default router;
