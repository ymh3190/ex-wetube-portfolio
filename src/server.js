import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { localsMiddlewares } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
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
app.use("/uploads", express.static(process.cwd() + "/uploads"));
app.use("/", rootRouter);
app.use("/users", userRouter);

export default app;
