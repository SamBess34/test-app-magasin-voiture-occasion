import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Already connected to db.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "find_used_cars",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (error) {
    console.error("Error connecting to db:", error);
  }

  isConnected = true;
  console.log("Connected to db.");
};
