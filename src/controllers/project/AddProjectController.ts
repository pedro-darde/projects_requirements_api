import { getCustomRepository } from "typeorm";
import { ok, serverError } from "../../helpers/http-helper";
import { Project } from "../../models/Project";
import { ProjectRequirement } from "../../models/ProjectRequirement";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ProjectPostgresRepository } from "../../repositories/ProjectPostgresRepository";
import { ProjectRequirementPostgresRepository } from "../../repositories/ProjectRequirementPostgresRepository";

export class AddProjectController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { project, requirements } = httpRequest.body;
      const repo = this.makeRepository();

      const parsedProject = repo.create(project);
      const projectInserted = await repo.add(parsedProject);
      await this.addRequirements(requirements, projectInserted);
      return ok(projectInserted);
    } catch (e) {
      return serverError(e);
    }
  }

  private makeRepository() {
    return getCustomRepository(ProjectPostgresRepository);
  }

  private async addRequirements(requirements: any[], project: Project) {
    let projectRequriments: ProjectRequirement[] = [];
    requirements.forEach((requirement) => {
      projectRequriments.push({ requirement: requirement, project: project });
    });
    const repo = this.getProjectRequirementRepository();
    await repo.add(projectRequriments);
  }

  private getProjectRequirementRepository() {
    return getCustomRepository(ProjectRequirementPostgresRepository);
  }
}
