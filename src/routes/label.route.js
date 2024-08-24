import { Router } from "express";
import { createLabel, deleteLabel, getAllLabel, updateLabel } from "../controllers/label.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/", verifyToken, getAllLabel);
router.post("/", verifyToken, createLabel);
router.put("/:id", verifyToken, updateLabel);
router.delete("/:id", verifyToken, deleteLabel);

export default router;
