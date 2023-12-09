import { Request, Response } from "express";
import Task from "../../models/task.model";
import { CustomRequest } from "../../middleware/auth";

export const deleteAllTasksForUser = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;

    const userId = customReq.token.id;

    await Task.deleteMany({ user: userId });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ message: "Failed to delete tasks", error });
  }
};
