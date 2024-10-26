import { model, Schema } from "mongoose";

const labelSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const Label = model("Label", labelSchema);

export default Label;
