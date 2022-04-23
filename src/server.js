import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { localsMiddlewares } from "./middlewares";
import apiRouter from "./routers/apiRouter";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_HOST }),
  })
);
app.use(localsMiddlewares);
app.use("/static", express.static(process.cwd() + "/static"));
app.use("/uploads", express.static(process.cwd() + "/uploads"));
app.use("/assets", express.static(process.cwd() + "/assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
