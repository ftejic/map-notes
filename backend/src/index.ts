import express from "express";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes";
import cors from "cors";
import connectToDB from "./config/db";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/account", accountRoutes)

connectToDB();

const PORT = process.env.PORT;

app.get("/", (request, response) => {
    response.send("Hello Word!");
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
