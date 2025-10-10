import { Router } from "express";
import signUp from "../controllers/auth/signUp.controller";
import login from "../controllers/auth/logIn.controller";
import { logout } from "../controllers/auth/logout.controller";

const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
