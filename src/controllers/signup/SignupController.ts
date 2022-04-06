import { getCustomRepository } from "typeorm";
import { EmailAlreadyInUseError } from "../../errors/EmailAlreadyInUseError";
import { emailInUse, ok } from "../../helpers/http-helper";
import { Controller } from "../../protocols/Controller";
import { Hasher } from "../../protocols/Hasher";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { UserPostgresRepository } from "../../repositories/UserPostgresRepository";

export class SignupController implements Controller {
    private readonly hasher: Hasher

    constructor(hasher: Hasher) {
        this.hasher = hasher
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { user } = request.body

        const repo = this.makeRepo();
        const modelUser = repo.create(user)

        const hasUser = !! await repo.findByEmail(modelUser.email)

        if (hasUser) {
            return emailInUse()
        }

        const userCreated = await repo.add(modelUser)
        const hashPass = await this.hasher.hash(userCreated.password)

        await repo.updatePassword(userCreated.id, hashPass)

        return ok(userCreated)
    }

    private makeRepo() {
        return getCustomRepository(UserPostgresRepository)
    }
}