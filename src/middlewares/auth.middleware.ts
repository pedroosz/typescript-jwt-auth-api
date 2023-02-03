import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.sendStatus(401);
    }

    verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: err.message,
                error: err
            })
        }

        return next()
    })
}