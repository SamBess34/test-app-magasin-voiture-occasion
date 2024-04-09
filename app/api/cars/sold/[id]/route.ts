import { connectToDb } from "@/app/lib/database";
import Car from "@/app/models/car";
import { IdGetOneCarRequestParams } from "@/app/types";
import { NextResponse } from "next/server";
console.log("dans le put");

export const PATCH = async (
  req: Request,
  { params }: IdGetOneCarRequestParams
) => {
  try {
    await connectToDb();
    const existingCar = await Car.findById(params.id);
    if (!existingCar) {
      console.log("Car not found");
      return NextResponse.json("Car not found", { status: 404 });
    }
    existingCar.available = false;
    await existingCar.save();
    return NextResponse.json(existingCar, {
      status: 200,
    });
  } catch (error) {
    console.log("Error to update car:", error);
    return NextResponse.json("Error to update car", {
      status: 500,
    });
  }
};
