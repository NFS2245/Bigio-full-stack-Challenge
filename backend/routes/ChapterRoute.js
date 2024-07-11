import express from "express";

import { getChapter, getChapterById, createChapter, updateChapter, deleteChapter, getChapterByNull, deleteChapterByNull } from "../controllers/ChapterController.js";

const router = express.Router();

router.get('/stories/:id/chapter', getChapter);
router.get('/stories/chapter/:id', getChapterById);
router.get('/chapter/null', getChapterByNull);
router.post('/stories/chapter', createChapter);
router.patch('/stories/chapter/:id', updateChapter);
router.delete('/stories/chapter/:id', deleteChapter);
router.delete('/chapter/null', deleteChapterByNull);

export default router;