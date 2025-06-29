import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session";
import path from "path";
import passport from "passport";
import config from "./config/index.js";
import usersRouter from "./routes/users.router.js";
import sessionRouter from "./routes/session.router.js";
import viewRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import initializedPassport from "./config/passport/config.js";

const { PORT, MONGO_URI, SECRET } = config;
const server = express();

//Configuración handlebars:
server.engine("handlebars", handlebars.engine()); // <-- Añadimos motor de renderizado
server.set("views", import.meta.dirname + "/views") // <-- Declaramos dónde van a estar las plantillas Handlebars
server.set("view engine", "handlebars"); // <-- Avisamos a Express cuál motor vamos a utilizar

//Middlewares:
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(session({
    secret: SECRET,
    saveUninitialized:true,
    resave:false,
    cookie:{
        httpOnly:true,
        sameSite:true,
        maxAge: 24 * 60 * 60
    }
}))

initializedPassport();
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(path.join(import.meta.dirname, 'public')));

//Rutas
server.use("/", viewRouter);
server.use("/api/users", usersRouter);
server.use("/api/session", sessionRouter);

server.listen(PORT, console.log(`Listening on port ${PORT}`));

//Conexión MongoDB
mongoose.connect(MONGO_URI, { dbName: "ecommerce" })
    .then(() => console.log("Connection successful MongoDB"))
    .catch((err) => {
        console.error({ error: err })
        process.exit(1)
    })
