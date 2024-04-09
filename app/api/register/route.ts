import { connectToDb } from "@/app/lib/database";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
console.log("Hello from register route");
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDb();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
