import { getCustomRepository } from "typeorm";
import { ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class AddRequirementController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { requirement } = httpRequest.body;
      const repo = this.makeRepository();
      const requirementParsed = repo.create(requirement);
      const requirementInserted = await repo.add(requirementParsed);

      return ok(requirementInserted);
    } catch (err) {
      console.error(err);
      return serverError(err);
    }
  }

  private makeRepository() {
    return getCustomRepository(RequirementPostgresRepository);
  }
}
