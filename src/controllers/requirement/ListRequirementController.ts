import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class ListRequirementController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const repo = this.makeRepository();
    const requirements = await repo.list();
    return ok(requirements);
  }

  private makeRepository() {
    return getCustomRepository(RequirementPostgresRepository);
  }
}
