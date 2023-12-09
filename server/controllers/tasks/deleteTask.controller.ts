import { Request, Response } from "express";

import Task from "../../models/task.model";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Task.deleteOne({ _id: id });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ message: "Unexpected server error", error });
  }
};
