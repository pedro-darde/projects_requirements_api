import { getCustomRepository } from "typeorm";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";

export class ShowProjectController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const repo = this.makeRepository();
      const project = await repo.findOne(id);
      return ok(project);
    } catch (e) {
      return serverError(e);
    }
  }

  private makeRepository() {
    return getCustomRepository(ProjectPostgresRepository);
  }
}
