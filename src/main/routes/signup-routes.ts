import { Router } from "express";
import { SignupController } from "../../controllers/signup/SignupController";
import { BcryptAdapter } from "../../infra/cryptography/BcryptAdapter";
import { adaptRoute } from "../adapter/express-route-adapter";

const makeAddUser = () => {
    const enctrypter = new BcryptAdapter(12);
    return new SignupController(enctrypter);
}

export default (route: Router) => {
    route.post('/user', adaptRoute(makeAddUser()))
}