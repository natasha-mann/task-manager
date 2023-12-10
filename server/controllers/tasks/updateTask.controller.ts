import { Request, Response } from "express";

import Task from "../../models/task.model";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, details, priorityLevel, status } = req.body;

    await Task.updateOne(
      { _id: id },
      { title, details, priorityLevel, status }
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ message: "Unexpected server error", error });
  }
};
