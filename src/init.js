import "./db";
import app from "./server";

app.listen(process.env.PORT, () =>
  console.log(`listening on *:${process.env.PORT}`)
);
