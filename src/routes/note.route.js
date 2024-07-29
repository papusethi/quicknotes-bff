import { Router } from "express";
import { createNote, deleteNote, getAllNote, updateNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/", verifyToken, getAllNote);
router.post("/", verifyToken, createNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
