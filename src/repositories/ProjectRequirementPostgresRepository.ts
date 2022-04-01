import { AbstractRepository, EntityRepository } from "typeorm";
import { Project } from "../models/Project";
import { ProjectRequirement } from "../models/ProjectRequirement";

@EntityRepository(ProjectRequirement)
export class ProjectRequirementPostgresRepository extends AbstractRepository<ProjectRequirement> {
  create(projectRequirement: ProjectRequirement) {
    return this.repository.create(projectRequirement);
  }

  async add(projectRequirements: ProjectRequirement[]) {
    return await this.repository.save(projectRequirements);
  }

  async findRequirementsForProject(project_id: number) {
    return await this.repository.find({ relations: ['requirement'], where: { project: project_id } });
  }
  async removeByProjectAndRequirement(requirements: number[], project: Project) {
    /** @ts-ignore */
    requirements.forEach(async requirement => await this.repository.delete({ project: project, requirement: requirement }))
  }
}
