import { Router } from "express";
import { AddProjectController } from "../../controllers/project/AddProjectController";
import { Controller } from "../../protocols/Controller";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeAddProject = (): Controller => {
  const addProjectController = new AddProjectController();
  return addProjectController;
};

export default (route: Router) => {
  route.post("project", adaptRoute(makeAddProject()));
};
