import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const AuthRouter = Router()

const Controller = new AuthController()

AuthRouter.post("/login", Controller.Login)
AuthRouter.post("/register", Controller.Register)