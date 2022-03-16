import { Router } from "express";
import { AddProjectController } from "../../controllers/project/AddProjectController";
import { ListProjectController } from "../../controllers/project/ListProjectController";
import { Controller } from "../../protocols/Controller";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeAddProject = (): Controller => {
  const addProjectController = new AddProjectController();
  return addProjectController;
};

const makeListProject = (): Controller => {
  const listProjectController = new ListProjectController();
  return listProjectController;
};

export default (route: Router) => {
  route.post("/project", adaptRoute(makeAddProject()));
  route.get("/project", adaptRoute(makeListProject()));
};
