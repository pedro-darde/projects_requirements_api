import { Request, Response } from "express";
import { Controller } from "../../protocols/Controller";
import { HttpRequest } from "../../protocols/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };

    const httpResponse = await controller.handle(httRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body.data);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  };
};
