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

  async list() {
    return await this.repository.find();
  }
}
