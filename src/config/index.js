import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
    SECRET: process.env.SECRET || "qsdasdsaseqwe1232",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "adasdas"
}