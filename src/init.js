import "regenerator-runtime/runtime.js";
import "./db";
import app from "./server";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on *:${process.env.PORT}`));
