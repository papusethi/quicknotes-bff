import Folder from "../models/folder.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllFolder = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const allFolders = await Folder.find({ userId }).sort({ createdAt: "descending" });
    res.status(200).json({ data: allFolders, message: "Fetched folders successfully." });
  } catch (error) {
    next(error);
  }
};

export const createFolder = async (req, res, next) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const newFolder = new Folder({ userId, name });
    await newFolder.save();

    // now fetch all the folders
    const allFolders = await Folder.find({ userId }).sort({ createdAt: "descending" });
    res.status(201).json({ data: allFolders, message: "Created folder successfully." });
  } catch (error) {
    next(error);
  }
};

export const updateFolder = async (req, res, next) => {
  const userId = req.user.id;
  const folderId = req.params.id;
  const { name } = req.body;

  try {
    const validFolder = await Folder.findById(folderId);

    if (validFolder?.userId === userId) {
      const updatedFolder = { name };
      await Folder.updateOne({ _id: folderId }, { $set: updatedFolder });

      // now fetch all the folder
      const allFolders = await Folder.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allFolders, message: "Updated folder successfully." });
    } else {
      return next(errorHandler(500, "You can only update your own folders."));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFolder = async (req, res, next) => {
  const userId = req.user.id;
  const folderId = req.params.id;

  try {
    const validFolder = await Folder.findById(folderId);
    if (validFolder.userId === userId) {
      await Folder.deleteOne({ _id: folderId });

      // now fetch all the folders
      const allFolders = await Folder.find({ userId }).sort({ createdAt: "descending" });
      res.status(200).json({ data: allFolders, message: "Deleted folder successfully." });
    } else {
      return next(errorHandler(500, "You can only delete your own folder."));
    }
  } catch (error) {
    next(error);
  }
};
