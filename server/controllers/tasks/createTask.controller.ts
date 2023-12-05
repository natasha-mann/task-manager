import { Request, Response } from "express";

import Task, { ITask } from "../../models/task.model";
import { IUser } from "../../models/user.model";

type CreateTaskPayload = {
  title: ITask["title"];
  details?: ITask["details"];
  priorityLevel: ITask["priorityLevel"];
  status: ITask["status"];
  user: IUser["_id"];
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const data: CreateTaskPayload = req.body;
    const newTask = await Task.create(data);
    return res
      .status(201)
      .send({ message: "Task successfully created", data: newTask });
  } catch (error) {
    return res.status(500).send({ message: "Failed to create task", error });
  }
};
