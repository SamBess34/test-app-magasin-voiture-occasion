import { connectToDb } from "@/app/lib/database";
import Car from "@/app/models/car";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDb();
    const data = await req.json();
    const newCar = new Car(data);
    await newCar.save();
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.log("Error creating car:", error);
    return NextResponse.json("Error creating car", { status: 500 });
  }
};
