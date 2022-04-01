import { AbstractRepository, EntityRepository } from "typeorm";
import { RequirementImage } from "../models/RequirementImage";

@EntityRepository(RequirementImage)
export class RequirementImagePostgresRepository extends AbstractRepository<RequirementImage> {
  create(requirementImage: RequirementImage) {
    return this.repository.create(requirementImage);
  }

  async add(images: RequirementImage[]) {
    return await this.repository.save(images);
  }
}
