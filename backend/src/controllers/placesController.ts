import { Request, Response } from "express";
import VisitedPlaces from "../models/visitedPlacesModel";
import Joi from "joi";

const customJoi = Joi.extend((joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.emptyHtml": "{{#label}} should not be empty HTML.",
  },
  rules: {
    emptyHtml: {
      validate(value, helpers) {
        // Remove HTML tags and check if the remaining text is empty
        const text = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
        if (text.length === 0) {
          return helpers.error("string.emptyHtml");
        }
        return value;
      },
    },
  },
}));

const placeSchema = Joi.object({
  userUID: Joi.string().required(),
  placeName: Joi.string().required(),
  arrivalDate: Joi.date().iso().required(),
  departureDate: Joi.date().iso().required(),
  ratings: Joi.object({
    food: Joi.number().required(),
    prices: Joi.number().required(),
    attractions: Joi.number().required(),
    nightlife: Joi.number().required(),
    overall: Joi.number().required(),
  }).required(),
  notes: customJoi.string().emptyHtml().required(),
  images: Joi.array().items(Joi.string()).optional(),
});

async function getPlaces(req: Request, res: Response) {
  const userUID = req.params.userUID;

  try {
    const places = await VisitedPlaces.find({ userUID });

    return res.status(200).json(places);
  } catch (error) {
    console.error("Error occured while getting places:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addPlace(req: Request, res: Response) {
  const { error } = placeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  const {
    userUID,
    placeName,
    arrivalDate,
    departureDate,
    ratings,
    notes,
    images,
  } = req.body;

  try {
    const newPlace = new VisitedPlaces({
      userUID,
      placeName,
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      ratings,
      notes,
      images: images || [],
    });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    console.error("Error occurred while saving place:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { addPlace, getPlaces };
