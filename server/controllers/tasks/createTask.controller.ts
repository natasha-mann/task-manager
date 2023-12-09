import { Request, Response } from "express";

import Task, { ITask } from "../../models/task.model";
import { IUser } from "../../models/user.model";
import { CustomRequest } from "../../middleware/auth";

type CreateTaskPayload = {
  title: ITask["title"];
  details?: ITask["details"];
  priorityLevel: ITask["priorityLevel"];
  status: ITask["status"];
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const data: CreateTaskPayload = req.body;

    const customReq = req as CustomRequest;

    const token = customReq.token;

    const newTaskData = {
      ...data,
      user: token.id,
    };

    const newTask = await Task.create(newTaskData);
    return res
      .status(201)
      .send({ message: "Task successfully created", data: newTask });
  } catch (error) {
    return res.status(500).send({ message: "Failed to create task", error });
  }
};
