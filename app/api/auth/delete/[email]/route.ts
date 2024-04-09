import { connectToDb } from "@/app/lib/database";
import User from "@/app/models/user";
import { IEmailDeleteUserequestParams } from "@/app/types";
import { NextResponse } from "next/server";
console.log("route delete user");
export const DELETE = async (
  req: Request,
  { params }: IEmailDeleteUserequestParams
) => {
  console.log("params", params);
  try {
    await connectToDb();
    const user = await User.findOne({ email: params.email });
    console.log("user à suppimer", user);
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }
    await User.findByIdAndDelete(user._id);
    return NextResponse.json("User deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Erreur deleting user", { status: 500 });
  }
};
