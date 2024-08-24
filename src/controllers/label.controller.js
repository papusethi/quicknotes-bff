import Label from "../models/label.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllLabel = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const allLabels = await Label.find({ userId }).sort({ createdAt: "descending" });
    res.status(200).json({ data: allLabels, message: "Fetched labels successfully." });
  } catch (error) {
    next(error);
  }
};

export const createLabel = async (req, res, next) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const newLabel = new Label({ userId, name });
    await newLabel.save();

    // now fetch all the labels
    const allLabels = await Label.find({ userId }).sort({ createdAt: "descending" });
    res.status(201).json({ data: allLabels, message: "Created label successfully." });
  } catch (error) {
    next(error);
  }
};

export const updateLabel = async (req, res, next) => {
  const userId = req.user.id;
  const labelId = req.params.id;
  const { name } = req.body;

  try {
    const validLabel = await Label.findById(labelId);

    if (validLabel?.userId === userId) {
      const updatedLabel = { name };
      await Label.updateOne({ _id: labelId }, { $set: updatedLabel });

      // now fetch all the labels
      const allLabels = await Label.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allLabels, message: "Updated label successfully." });
    } else {
      return next(errorHandler(500, "You can only update your own labels."));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLabel = async (req, res, next) => {
  const userId = req.user.id;
  const labelId = req.params.id;

  try {
    const validLabel = await Label.findById(labelId);
    if (validLabel.userId === userId) {
      await Label.deleteOne({ _id: labelId });

      // now fetch all the labels
      const allLabels = await Label.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allLabels, message: "Deleted label successfully." });
    } else {
      return next(errorHandler(500, "You can only delete your own label."));
    }
  } catch (error) {
    next(error);
  }
};
