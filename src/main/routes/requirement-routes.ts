import { Router } from "express";
import { AddRequirementController } from "../../controllers/requirement/AddRequirementController";
import { ListRequirementController } from "../../controllers/requirement/ListRequirementController";
import { Controller } from "../../protocols/Controller";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeAddRequirement = (): Controller => {
  return new AddRequirementController();
};

const makeListRequirement = (): Controller => {
  return new ListRequirementController();
};

export default (router: Router) => {
  router.post("/requirement", adaptRoute(makeAddRequirement()));
  router.get("/requirement", adaptRoute(makeListRequirement()));
};
