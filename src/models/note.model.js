import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    color: { type: String, default: null }
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

export default Note;
