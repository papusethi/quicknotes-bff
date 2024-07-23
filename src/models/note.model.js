import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

export default Note;
