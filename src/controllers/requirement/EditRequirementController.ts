import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class EditRequirementController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
    const { requirement } = request.body
        const { id } = request.params
        const newRequirement = await this.makeRepository().edit(requirement, id)
        return ok(newRequirement)
    }

    private makeRepository() {
        return getCustomRepository(RequirementPostgresRepository)
    }
}