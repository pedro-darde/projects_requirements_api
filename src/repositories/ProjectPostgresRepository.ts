import { AbstractRepository, EntityRepository } from "typeorm";
import { Project } from "../models/Project";

@EntityRepository(Project)
export class ProjectPostgresRepository extends AbstractRepository<Project> {
  create(project: Project) {
    return this.repository.create(project);
  }

  async add(project: Partial<Project>): Promise<Project> {
    return this.repository.save(project);
  }
}
