import { Sequelize } from "sequelize";

const db = new Sequelize('storyku', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;