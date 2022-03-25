import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(process.cwd() + "/uploads"));
app.use("/", rootRouter);

export default app;
