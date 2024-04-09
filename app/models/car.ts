import { Schema, model, models } from "mongoose";
import { ICar } from "../types";

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "car" }
);

const Car = models.Car || model<ICar>("Car", carSchema);

export default Car;
