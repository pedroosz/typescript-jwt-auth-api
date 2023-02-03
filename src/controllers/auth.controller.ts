import { Request, Response } from "express";
import { DatabaseClient } from "../database";
import { compare, hash } from "bcrypt"
import { createJWT } from "../utils/createJWT";

export class AuthController {
    async Login(req: Request, res: Response) {
        const { username, password, email } = req.body;

        if (!password) return res.sendStatus(400)

        if (!email && !username) return res.sendStatus(400)

        const UserExists = await DatabaseClient.user.findFirst({
            where: {
                OR: [
                    { email: { equals: email } },
                    { username: { equals: username } }
                ],
            }
        })

        if (!UserExists) return res.sendStatus(404);

        compare(password, UserExists.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                })
            }

            if (result == false) {
                return res.status(401).json({
                    message: "Wrong password."
                })
            }

            createJWT(UserExists, (_err, token) => {
                if (_err) {
                    return res.status(500).json({
                        message: "Unable to sign a JWT",
                        error: _err
                    })
                }

                if (token) {
                    return res.status(200).json({
                        token,
                        username,
                        email
                    })
                }
            })
        })
    }

    async Register(req: Request, res: Response) {
        const { username, password, email } = req.body;

        console.log(req.body)

        if (!password || !email || !username) return res.sendStatus(400)

        const UserExists = await DatabaseClient.user.findFirst({
            where: {
                email: email,
                OR: {
                    username: username
                }
            }
        })

        if (UserExists) return res.sendStatus(403);

        hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    err: err
                })
            }

            DatabaseClient.user.create({
                data: {
                    email,
                    username,
                    password: hash
                }
            }).then(user => {
                createJWT(user, (_err, token) => {
                    if (_err) {
                        return res.status(500).json({
                            message: "Unable to sign a JWT",
                            error: _err
                        })
                    }

                    if (token) {
                        return res.status(200).json({
                            token,
                            username,
                            email
                        })
                    }
                })
            })
        })
        return res.status(500)
    }
}