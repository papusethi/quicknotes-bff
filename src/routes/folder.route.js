import { Router } from "express";
import { createFolder, deleteFolder, getAllFolder, updateFolder } from "../controllers/folder.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/", verifyToken, getAllFolder);
router.post("/", verifyToken, createFolder);
router.put("/:id", verifyToken, updateFolder);
router.delete("/:id", verifyToken, deleteFolder);

export default router;
