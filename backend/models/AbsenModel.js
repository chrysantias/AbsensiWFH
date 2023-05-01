import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Absen = db.define('absensi', {
    name: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    img: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

export default Absen;

(async () => {
    await db.sync()

})();