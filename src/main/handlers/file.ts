import { Request, Response, NextFunction, } from "express";
type File = {
    name: string,
    type: string;
    size: number,
    extension: string
}
export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
    const { files } = req;
    const mappedFiles: File[] = ((files as Express.Multer.File[]) || []).map(
        (file) => ({
            name: file.filename,
            type: file.mimetype,
            size: file.size,
            extension: `${file.originalname.split(".").pop()}`,
        })
    );

    Object.assign(req.body, { files: mappedFiles });
    return next();
};