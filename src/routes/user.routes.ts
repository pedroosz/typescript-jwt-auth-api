import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ensureAuthentication } from "../middlewares/auth.middleware";

export const UserRouter = Router()

const Controller = new UserController()

UserRouter.get("/@me", ensureAuthentication, Controller.GetMe)
UserRouter.get("/:id", ensureAuthentication, Controller.GetOne)