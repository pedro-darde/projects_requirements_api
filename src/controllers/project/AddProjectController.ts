import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";

export class AddProjectController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { project } = httpRequest.body;
    const repo = AddProjectController.makeRepository();
    
    const parsedProject = repo.create(project)
    const projectInserted = await repo.add(parsedProject);

    return ok(projectInserted);
  }

  static makeRepository() {
    return getCustomRepository(ProjectPostgresRepository);
  }
}
