import { model, Schema } from "mongoose";

const folderSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String }
  },
  { timestamps: true }
);

const Label = model("Folder", folderSchema);

export default Label;
