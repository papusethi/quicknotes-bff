import Note from "../models/note.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllNote = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const allNotes = await Note.find({ userId }).sort({ createdAt: "descending" });
    res.status(200).json({ data: allNotes, message: "Fetched notes successfully." });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const userId = req.user.id;
  const { title, description, tags, isPinned, isArchived, color, tasks } = req.body;

  try {
    const newNote = new Note({ userId, title, description, tags, isPinned, isArchived, color, tasks });
    await newNote.save();

    // now fetch all the notes
    const allNotes = await Note.find({ userId }).sort({ createdAt: "descending" });
    res.status(201).json({ data: allNotes, message: "Created note successfully." });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const { title, description, tags, isPinned, isArchived, color, tasks } = req.body;

  try {
    const validNote = await Note.findById(noteId);

    if (validNote?.userId === userId) {
      const updatedNote = { title, description, tags, isPinned, isArchived, color, tasks };
      await Note.updateOne({ _id: noteId }, { $set: updatedNote });

      // now fetch all the notes
      const allNotes = await Note.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allNotes, message: "Updated note successfully." });
    } else {
      return next(errorHandler(500, "You can only update your own note."));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  try {
    const validNote = await Note.findById(noteId);
    if (validNote.userId === userId) {
      await Note.deleteOne({ _id: noteId });
      // now fetch all the notes
      const allNotes = await Note.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allNotes, message: "Deleted note successfully." });
    } else {
      return next(errorHandler(500, "You can only delete your own note."));
    }
  } catch (error) {
    next(error);
  }
};
