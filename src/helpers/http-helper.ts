import { EntityNotFoundError } from "typeorm";
import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../protocols/http";

export const  badRequest = (error: string[]): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 201,
  body: { message: "Informações inseridas com sucesso", data },
});

export const serverError = (e: any): HttpResponse => ({
  statusCode: 500,
  body: [new ServerError(e.stack!)],
});

export const entityNotFound = (e: EntityNotFoundError): HttpResponse => ({
  statusCode: 403,
  body: ["O registro nao pode ser encontrado"],
});
