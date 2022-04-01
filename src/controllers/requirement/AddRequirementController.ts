import { getCustomRepository } from "typeorm";
import { FILE_DIRECTORY } from "../../constants/FileDir";
import { ok, serverError } from "../../helpers/http-helper";
import { Requirement } from "../../models/Requirement";
import { RequirementImage } from "../../models/RequirementImage";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { RequirementImagePostgresRepository } from "../../repositories/RequirementImagePostgresRepository";
import { RequirementPostgresRepository } from "../../repositories/RequirementPostgresRepository";

export class AddRequirementController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      let { requirement } = httpRequest.body;
      requirement = JSON.parse(requirement)
      const repo = this.makeRepository();
      const requirementParsed = repo.create(requirement);
      const requirementInserted = await repo.add(requirementParsed);

      if (httpRequest.body.files && httpRequest.body.files.length > 0) {
        await this.addRequirementImages(httpRequest.body.files, requirementInserted)
      }

      return ok(requirementInserted);
    } catch (err) {
      console.error(err);
      return serverError(err);
    }
  }

  private async addRequirementImages(files: Array<File>, requirement: Requirement) {
    const productFiles: RequirementImage[] = []
    files.forEach(file => {
      const pathFile = `${process.env.API_URL}${FILE_DIRECTORY}/${file.name}`
      productFiles.push({ fileName: file.name, requirement: requirement.id, path: pathFile })
    })

    await this.makeRequirementImageRepository().add(productFiles);
  }

  private makeRepository() {
    return getCustomRepository(RequirementPostgresRepository);
  }
  private makeRequirementImageRepository() {
    return getCustomRepository(RequirementImagePostgresRepository)
  }
}
