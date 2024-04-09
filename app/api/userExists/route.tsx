import { connectToDb } from "@/app/lib/database";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDb();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
