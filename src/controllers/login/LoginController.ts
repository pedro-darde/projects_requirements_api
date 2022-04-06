import { Authentication } from "../../domain/usecases/Authentication";
import { ok, serverError, unauthorized } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class LoginController implements Controller {
    private readonly authentication: Authentication

    constructor(authentication: Authentication) {
        this.authentication = authentication
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest.body
            const accessToken = await this.authentication.auth({ password, email })
            if (!accessToken) return unauthorized()

            return ok(accessToken)
        } catch (err) {
            return serverError(err)
        }
    }

}