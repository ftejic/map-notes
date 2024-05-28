import express from "express";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoutes";
import cors from "cors";
import connectToDB from "./config/db";

dotenv.config();

async function startServer(): Promise<void> {
    try {
        await connectToDB();

        const app = express();

        app.use(
            cors({
                origin: "http://localhost:3000",
            })
        );

        app.use("/api/account", accountRoutes);

        const PORT = process.env.PORT;

        app.get("/", (request, response) => {
            response.send("Hello Word!");
        });

        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
}

(async () => {
    try {
        await startServer();
    } catch (error) {
        console.error("An error occurred while starting the server:", error);
    }
})();
