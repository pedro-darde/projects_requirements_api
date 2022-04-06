export class EmailAlreadyInUseError extends Error {
    constructor() {
        super("O email informado já está sendo utilizado");
        this.name = "EmailAlreadyInUseError";
    }
}
