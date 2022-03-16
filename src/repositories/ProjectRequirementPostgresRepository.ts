import { AbstractRepository, EntityRepository } from "typeorm";
import { ProjectRequirement } from "../models/ProjectRequirement";

@EntityRepository(ProjectRequirement)
export class ProjectRequirementPostgresRepository extends AbstractRepository<ProjectRequirement> {
  create(projectRequirement: ProjectRequirement) {
    return this.repository.create(projectRequirement);
  }

  async add(projectRequirements: ProjectRequirement[]) {
    return await this.repository.save(projectRequirements);
  }
}
