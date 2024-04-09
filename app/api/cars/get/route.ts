import { connectToDb } from "@/app/lib/database";
import Car from "@/app/models/car";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDb();
    const cars = await Car.find();
    if (!cars) {
      console.log("No cars found");
      return NextResponse.json("No cars found", { status: 404 });
    }
    return NextResponse.json(cars, {
      status: 200,
    });
  } catch (error) {
    console.log("Error to get all cars:", error);
    return NextResponse.json("Error to get all cars", {
      status: 500,
    });
  }
};
