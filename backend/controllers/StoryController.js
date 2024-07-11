import Story from "../models/StoryModel.js";
import Chapter from "../models/ChapterModel.js";
import { Sequelize } from "sequelize";

const { Op } = Sequelize;

export const getStories = async(req, res) =>{
    try{
        const response = await Story.findAll();
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const getStoriesById = async (req, res) => {
    try {
        const response = await Story.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getStoriesByNameAuthor = async (req, res) => {
    try {
        const searchTerm = req.params.body;

        const response = await Story.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    },
                    {
                        author: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    }
                ]
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getStoriesByCatStat = async (req, res) => {
    try {
        const searchTerm1 = req.params.search1;
        const searchTerm2 = req.params.search2;

        const response = await Story.findAll({
            where: {
                category: {
                    [Op.eq]: searchTerm1
                },
                status: {
                    [Op.eq]: searchTerm2
                }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createStories = async (req, res) => {
    try {
        const newStory = await Story.create(req.body);

        await Chapter.update(
            {idStories: newStory.id},
            { where: { idStories: null}}
        );
        res.status(201).json({msg: "Story Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateStories = async (req, res) => {
    try {
        await Story.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        await Chapter.update(
            { idStories: req.params.id },
            { where: { idStories: null } }
        );
        res.status(200).json({msg: "Story Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteStories = async (req, res) => {
    try {
        await Story.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Story Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}