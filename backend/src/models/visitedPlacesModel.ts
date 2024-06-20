import mongoose from "mongoose";

const visitedPlacesSchema = new mongoose.Schema({
  userUID: { type: String, required: true },
  placeName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  ratings: {
    food: { type: Number, required: true },
    prices: { type: Number, required: true },
    attractions: { type: Number, required: true },
    nightlife: { type: Number, required: true },
    overall: { type: Number, required: true },
  },
  notes: { type: String, required: true },
  images: { type: [String], required: false, default: [] },
});

const VisitedPlaces = mongoose.model("VisitedPlaces", visitedPlacesSchema);
export default VisitedPlaces;
