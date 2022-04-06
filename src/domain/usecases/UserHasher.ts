import { User } from "../../models/Users";

export interface UserHasher {
    hash: (user: User) => Promise<string>
}