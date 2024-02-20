import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const URI = process.env.MONGODB_URI;

mongoose
  .connect(`${URI}`)
  .then((res) => {
    console.log("Connected successfully!!!!");
  })
  .catch((err) => console.log("Error connecting == ", err.message));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
