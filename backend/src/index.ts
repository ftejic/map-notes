import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();


const PORT = process.env.PORT;

app.get("/", (request, response) => {
    response.send("Hello Word");
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
