import { Router } from "express";
import { AddRequirementController } from "../../controllers/requirement/AddRequirementController";
import { ListRequirementController } from "../../controllers/requirement/ListRequirementController";
import { Controller } from "../../protocols/Controller";
import { adaptRoute } from "../adapter/express-route-adapter";
import multer from 'multer'
import path from "path";
import { FILE_DIRECTORY } from "../../constants/FileDir";
import { fileHandler } from "../handlers/file";
import { EditRequirementController } from "../../controllers/requirement/EditRequirementController";
import { ShowRequirementController } from "../../controllers/requirement/ShowRequirementController";

const makeAddRequirement = (): Controller => new AddRequirementController();
const makeListRequirement = (): Controller => new ListRequirementController();
const makeEditRequirement = (): Controller => new EditRequirementController()
const makeShowRequirement = (): Controller => new ShowRequirementController();

export default (router: Router) => {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', FILE_DIRECTORY),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  })
  const upload = multer({ storage: storage })

  router.post("/requirement", upload.array('images'), fileHandler, adaptRoute(makeAddRequirement()));
  router.get("/requirement", adaptRoute(makeListRequirement()));
  router.get("/requirement/:id", adaptRoute(makeShowRequirement()))
  router.patch("/requirement/:id", adaptRoute(makeEditRequirement()))
};
