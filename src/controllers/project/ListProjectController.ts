import { getCustomRepository } from "typeorm";
import { ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";

export class ListProjectController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const repo = this.makeRepository();
      const projects = await repo.list();
      return ok(projects);
    } catch (e) {
      return serverError(e);
    }
  }

  private makeRepository() {
    return getCustomRepository(ProjectPostgresRepository);
  }
}
