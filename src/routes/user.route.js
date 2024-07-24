import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
