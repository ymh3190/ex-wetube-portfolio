import "./db";
import app from "./server";

app.listen(process.env.PORT, () =>
  console.log(`listening on http://localhost:${process.env.PORT}`)
);
