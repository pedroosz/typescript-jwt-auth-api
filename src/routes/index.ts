import { Router } from "express";
import { AuthRouter } from "./auth.routes";
import { UserRouter } from "./user.routes";

export const router = Router();

router.use("/auth", AuthRouter)
router.use("/users", UserRouter)