import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";

export class ListProjectController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const repo = ListProjectController.makeRepo();
    const projects = await repo.list();

    return ok(projects);
  }

  static makeRepo() {
    return getCustomRepository(ProjectPostgresRepository);
  }
}
