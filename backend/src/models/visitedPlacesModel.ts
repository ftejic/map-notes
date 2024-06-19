import mongoose from "mongoose";

const visitedPlacesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  placeName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  ratings: {
    food: { type: Number, required: true },
    prices: { type: Number, required: true },
    attractions: { type: Number, required: true },
    nightlife: { type: Number, required: true },
    overal: { type: Number, required: true },
  },
  desc: { type: String, required: true },
});

const VisitedPlaces = mongoose.model("VisitedPlaces", visitedPlacesSchema);
export default VisitedPlaces;
