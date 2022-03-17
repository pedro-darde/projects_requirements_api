import express from "express";
import path from "path";
import setupMiddlaweres from "./middlewares";
import setupRoutes from "./routes";
const app = express();

app.get("/", (req, res) => {
    res.end("<h1> Project requirement API </h1>")
})

app.get("/api", (req, res) => {
    res.end("<h1> Project requirement API </h1>")
})

setupMiddlaweres(app);
setupRoutes(app);
export default app;
