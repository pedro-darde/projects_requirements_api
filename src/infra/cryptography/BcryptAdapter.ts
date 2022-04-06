import { HashCompare } from "../../protocols/HashCompare";
import { Hasher } from "../../protocols/Hasher";
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher, HashCompare {
    private readonly salt: number

    constructor(salt: number) {
        this.salt = salt
    }

    async hash(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}