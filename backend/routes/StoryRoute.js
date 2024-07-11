import express from "express";
import {getStories, getStoriesById, createStories, updateStories, deleteStories, getStoriesByNameAuthor, getStoriesByCatStat} from "../controllers/StoryController.js";

const router = express.Router();

router.get('/stories', getStories);
router.get('/stories/:id', getStoriesById);
router.get('/stories/search/:body', getStoriesByNameAuthor);
router.get('/stories/filters/:search1/:search2', getStoriesByCatStat);
router.post('/stories', createStories);
router.patch('/stories/:id', updateStories);
router.delete('/stories/:id', deleteStories);

export default router;