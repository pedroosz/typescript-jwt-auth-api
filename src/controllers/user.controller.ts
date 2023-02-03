import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { DatabaseClient } from "../database";
import jwt_decode from "jwt-decode";

export class UserController {
    async Create(req: Request, res: Response) {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(401).json({
                message: "There are some fields missing."
            })
        }
    }

    async GetAll(req: Request, res: Response) {
        const AllUsersQuery = await DatabaseClient.user.findMany();

        return res.json(AllUsersQuery)
    }

    GetMe(req: Request, res: Response) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.sendStatus(401);
        }

        verify(token, process.env.TOKEN_SECRET as string, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: err.message,
                    error: err
                })
            }

            if (!decoded) return res.status(500).json({
                message: "Unable to decode token."
            })

            var decodedToken = jwt_decode<UserToken>(token);

            await DatabaseClient.user.findFirst({
                where: {
                    id: decodedToken.context.id
                },
                select: {
                    id: true,
                    email: true,
                    created_at: true,
                    username: true
                }
            }).then((TokenUserData) => {
                return res.status(200).json(TokenUserData);
            })
        })
    }

    async GetOne(req: Request, res: Response) {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(404).json({
                message: "The parameter `id` should be a integer."
            })
        }

        await DatabaseClient.user.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                created_at: true,
                username: true
            }
        }).then((UserData) => {
            if (!UserData) {
                return res.status(404).send({
                    message: "User not found."
                })
            }

            return res.status(200).json(UserData)
        }).catch((err) => {
            return res.status(500).json({
                error: err
            })
        })
    }
}