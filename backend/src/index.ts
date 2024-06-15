import express from "express";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes";
import cors from "cors";
import connectToDB from "./config/db";
import decodeToken from "./middleware/authenticate";
import { createServer } from "http";

dotenv.config();

async function startServer(): Promise<void> {
  try {
    await connectToDB();

    const app = express();

    app.use(
      cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
      })
    );

    app.use(express.json());

    app.use(decodeToken);

    app.use("/api/account", accountRoutes);

    const PORT = process.env.PORT || 5000;

    app.get("/", (request, response) => {
      response.send("Hello Word!");
    });

    const server = createServer(app);

    server.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
      });
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

startServer().catch((error) => {
  console.error("An error occurred while starting the server:", error);
});
