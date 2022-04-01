import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class ShowRequirementController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params
        const requirement = await this.repo().show(id)
        return ok(requirement)
    }

    private repo() {
        return getCustomRepository(RequirementPostgresRepository)
    }
}