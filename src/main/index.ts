import "../database/connection";
import app from "./config/app";
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
