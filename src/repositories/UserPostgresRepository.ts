import { AbstractRepository, EntityRepository } from "typeorm";
import { User } from "../models/Users";

@EntityRepository(User)
export class UserPostgresRepository extends AbstractRepository<User> {
    create(user: User) {
        return this.repository.create(user);
    }

    async add(user: User) {
        return await this.repository.save(user);
    }

    async updatePassword(user_id: number, hashedPassword: string) {
        await this.repository.update(user_id, { password: hashedPassword })
    }

    async findByEmail(email: string) {
        return await this.repository.findOne({ where: { email } })
    }
}
