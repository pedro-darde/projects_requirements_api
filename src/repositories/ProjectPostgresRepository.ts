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

  async findOne(project_id: number): Promise<Project> {
    return await this.repository.findOneOrFail(project_id, { relations: ['projectRequirements'] });
  }

  async edit(project: Project, id: number) {
    await this.repository.update(id, project)
    return this.repository.findOneOrFail(id)
  }

  async list(): Promise<Project[]> {
    return this.repository.find({
      order: { id: "DESC" },
      relations: ["projectRequirements"],
    });
  }
}
