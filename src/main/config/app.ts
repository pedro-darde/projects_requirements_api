import express from "express";
import path from "path";
import setupMiddlaweres from "./middlewares";
import setupRoutes from "./routes";
const app = express();

setupMiddlaweres(app);
setupRoutes(app);

app.use("/uploads/requirements", express.static(path.join(__dirname, "..", '..', "uploads/requirements")));
export default app;
