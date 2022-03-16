import { getCustomRepository } from "typeorm";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class ADdRequirementController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { requirement } = httpRequest.body;
  }

  static makeRepository() {
    return getCustomRepository();
  }
}
