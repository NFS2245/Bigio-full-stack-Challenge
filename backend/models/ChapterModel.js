import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Stories from "./StoryModel.js";

const { DataTypes } = Sequelize;

const Chapter = db.define('chapter', {
    titleChapter: DataTypes.STRING,
    storyChapter: DataTypes.TEXT,
    idStories: {
        type: DataTypes.INTEGER,
        references:{
            model: Stories,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

Chapter.belongsTo(Stories, {foreignKey: 'idStories'});

export default Chapter;

(async () => {
    await db.sync();
})();