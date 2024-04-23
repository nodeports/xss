import { Router } from "express";
import { register, login, getUser } from "../controllers/user";
import { authenticateToken, authorizeRole } from "../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["Admin", "User"]),
  getUser
);

export default router;
