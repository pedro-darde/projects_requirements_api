import { Router } from "express";
import { LoginController } from "../../controllers/login/LoginController";
import { UserAuthentication } from "../../data/UserAuthentication";
import { BcryptAdapter } from "../../infra/cryptography/BcryptAdapter";
import { JwtAdapter } from "../../infra/cryptography/JwtAdapter";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeLoginController = () => {
    const comparer = new BcryptAdapter(12)
    const encrypter = new JwtAdapter('a&8@!f!#scd')
    const authentication = new UserAuthentication(encrypter, comparer)
    return new LoginController(authentication)
}
export default (route: Router) => {
    route.post('/login', adaptRoute(makeLoginController()))
}