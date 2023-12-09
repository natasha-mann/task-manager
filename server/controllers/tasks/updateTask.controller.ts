import { Request, Response } from "express";

import Task from "../../models/task.model";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Task.updateOne({ _id: id }, { data });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ message: "Unexpected server error", error });
  }
};
