import { connectToDb } from "@/app/lib/database";
import Car from "@/app/models/car";
import { IdGetOneCarRequestParams } from "@/app/types";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: IdGetOneCarRequestParams
) => {
  try {
    await connectToDb();

    const car = await Car.findById(params.id);

    if (!car) {
      console.log("Car not found");
      return NextResponse.json("Car not found", { status: 404 });
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.log("Error fetching car:", error);
    return NextResponse.json("Error fetching car", { status: 500 });
  }
};
