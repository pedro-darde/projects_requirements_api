import { AbstractRepository, EntityRepository } from "typeorm";
import { Requirement } from "../models/Requirement";

@EntityRepository(Requirement)
export class RequirementPostgresRepository extends AbstractRepository<Requirement> {
  create(requirement: Requirement) {
    return this.repository.create(requirement);
  }

  async add(requirement: Requirement) {
    return await this.repository.save(requirement);
  }

  async show(requirement_id: number) {
    return await this.repository.findOneOrFail(requirement_id, { relations: ['pictures'] })
  }

  async edit(requirement: Requirement, id: number) {
    await this.repository.update(id, requirement)
    return this.repository.findOneOrFail(id)
  }

  async list() {
    return await this.repository.find({ relations: ['pictures'], order: { id: 'DESC' } });
  }
}
