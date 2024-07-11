import Chapter from "../models/ChapterModel.js";
import { Sequelize } from "sequelize";

const { Op } = Sequelize;

export const getChapter = async (req, res) => {
    try {
        const response = await Chapter.findAll({
            where:{
                [Op.or]:[
                    {idStories: req.params.id},
                    { idStories: null }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getChapterById = async (req, res) => {
    try {
        const response = await Chapter.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getChapterByNull = async (req, res) => {
    try {
        const response = await Chapter.findAll({
            where: {
                idStories: null
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createChapter = async (req, res) => {
    try {
        await Chapter.create(req.body);
        res.status(201).json({ msg: "Chapter Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateChapter = async (req, res) => {
    try {
        await Chapter.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteChapter = async (req, res) => {
    try {
        await Chapter.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteChapterByNull = async (req, res) => {
    try {
        const chapterDelete = await Chapter.findAll({
            where: {
                idStories: null
            }
        });

        const chapterIds = chapterDelete.map((chapter) => chapter.id);

        await Chapter.destroy({
            where: {
                id: chapterIds
            }
        });
        res.status(200).json({ msg: "Chapter Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}