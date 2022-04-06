import { getCustomRepository } from "typeorm";
import { Authentication, AuthenticationModel } from "../domain/usecases/Authentication";
import { User } from "../models/Users";
import { Enctrypter } from "../protocols/Encrypter";
import { HashCompare } from "../protocols/HashCompare";
import { UserPostgresRepository } from "../repositories/UserPostgresRepository";

export class UserAuthentication implements Authentication {
    private readonly encrypter: Enctrypter
    private readonly hashCompare: HashCompare

    constructor(encrypter: Enctrypter, hashCompare: HashCompare) {
        this.encrypter = encrypter
        this.hashCompare = hashCompare
    }

    async auth(authenticationModel: AuthenticationModel): Promise<string | null> {
        const model = await this.makeRepo().findByEmail(authenticationModel.email)
        if (model) {
            const isValid = await this.hashCompare.compare(authenticationModel.password, model.password)
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(model.id.toString())
                return accessToken
            }
        }
        return null
    };

    private makeRepo() {
        return getCustomRepository(UserPostgresRepository)
    }
}