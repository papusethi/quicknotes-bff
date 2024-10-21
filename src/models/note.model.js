import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    labels: { type: [String], default: null },
    folderId: { type: String, default: null },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    color: { type: String, default: null },
    dueDateTime: { type: String, default: null },
    type: { type: String, required: true },
    tasks: { type: [{ title: String, checked: Boolean, order: Number }], default: null }
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

export default Note;
