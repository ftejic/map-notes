import mongoose from "mongoose";

async function connectToDB() {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI as string, {});
    console.log(`Connected to MongoDB: ${con.connection.host}`);
  } catch (e) {
    const error = e as Error;
    console.log(`Error: ${error.message}`);
  }
}
export default connectToDB;
