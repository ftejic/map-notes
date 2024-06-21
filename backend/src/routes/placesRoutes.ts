import express from "express";
import { addPlace, getPlaces } from "../controllers/placesController";

const router = express.Router();

router.route("/get-places/:userUID").get(getPlaces);
router.route("/add-place").post(addPlace);

export default router;
