import jwt, { Secret } from 'jsonwebtoken'
import { Decrypter } from '../../protocols/Decrypter'
import { Enctrypter } from '../../protocols/Encrypter'
export class JwtAdapter implements Enctrypter, Decrypter {
    private readonly secret: Secret
    constructor(secret: Secret) {
        this.secret = secret
    }

    async encrypt(value: string): Promise<string> {
        const token = jwt.sign({ id: value }, this.secret)
        return token
    }

    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret)
        return value
    }
}
