import { CustomRequest } from "./../../middleware/auth";
import { Request, Response } from "express";

import Task, { ITask } from "../../models/task.model";

export const getAllTasksForUser = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  const user = customReq.token;

  console.log({ user });

  const tasks = await Task.find({ user: user.id });

  console.log({ tasks });

  return res.status(200).send(tasks);
};
