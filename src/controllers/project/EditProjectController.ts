import { getCustomRepository } from "typeorm";
import { ok } from "../../helpers/http-helper";
import { Project } from "../../models/Project";
import { ProjectRequirement } from "../../models/ProjectRequirement";
import { Requirement } from "../../models/Requirement";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";
import { ProjectRequirementPostgresRepository } from "../../repositories/ProjectRequirementPostgresRepository";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class EditProjectController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { requirements, project } = request.body
        const { id } = request.params;
        this.clearProjectDependencies(project)
        const newProject = await this.makeRepo().edit(project, id);
        if (requirements) {
            await this.updateOrDeleteRequirements(requirements, newProject)
        }

        return ok(newProject)
    }

    private async updateOrDeleteRequirements(requirements: number[], project: Project) {
        const projectRequirements: ProjectRequirement[] = [];

        const currentRequirements = (await this.projectRequirementRepo().findRequirementsForProject(project.id)).map((pc) => pc.requirement.id);
        const toInsert = requirements.filter((cat) => !currentRequirements.includes(cat));
        const toRemove = currentRequirements.filter((cat) => !requirements.includes(cat));

        // inserindo as novas categorias
        toInsert.forEach((id: any) => projectRequirements.push({ requirement: id, project: project }));
        await this.projectRequirementRepo().add(projectRequirements);


        // removendo as categorias que nao existem mais
        if (toRemove.length > 0) await this.projectRequirementRepo().removeByProjectAndRequirement(toRemove, project)
    }

    private projectRequirementRepo() {
        return getCustomRepository(ProjectRequirementPostgresRepository)
    }

    private requirementRepo() {
        return getCustomRepository(RequirementPostgresRepository)
    }

    private makeRepo() {
        return getCustomRepository(ProjectPostgresRepository)
    }

    private clearProjectDependencies(project: any) {
        delete project.requirements
        return project
    }

}