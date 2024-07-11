import express from "express";
import cors from "cors";
import StoryRoute from "./routes/StoryRoute.js";
import ChapterRoute from "./routes/ChapterRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(StoryRoute);
app.use(ChapterRoute);

app.listen(5000, () => console.log("server up and running..."));
