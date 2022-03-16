import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class AddRequirementController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { requirement } = httpRequest.body;
    const repo = this.makeRepository();
    const requirementParsed = repo.create(requirement);
    const requirementInserted = await repo.add(requirementParsed);

    return ok(requirementInserted);
  }

  private makeRepository() {
    return getCustomRepository(RequirementPostgresRepository);
  }
}
