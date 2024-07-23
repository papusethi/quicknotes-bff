import { Router } from "express";
import { createNote, deleteNote, getAllNote, updateNote } from "../controllers/note.controller.js";

const router = Router();

router.get("/", getAllNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
