import express from "express";
import { addPlace } from "../controllers/placesController";

const router = express.Router();

router.route("/add-place").post(addPlace);

export default router;
