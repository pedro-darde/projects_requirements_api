import { Router } from "express";
import { AddProjectController } from "../../controllers/project/AddProjectController";
import { EditProjectController } from "../../controllers/project/EditProjectController";
import { ListProjectController } from "../../controllers/project/ListProjectController";
import { ShowProjectController } from "../../controllers/project/ShowProjectController";
import { Controller } from "../../protocols/Controller";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeAddProject = (): Controller => new AddProjectController();
const makeListProject = (): Controller => new ListProjectController();
const makeEditProject = (): Controller => new EditProjectController()
const makeShowProject = (): Controller => new ShowProjectController()
export default (route: Router) => {
  route.post("/project", adaptRoute(makeAddProject()));
  route.get("/project", adaptRoute(makeListProject()));
  route.get("/project/:id", adaptRoute(makeShowProject()));
  route.patch('/project/:id', adaptRoute(makeEditProject()))
};
