import { Router } from "express";
import {
  createTask,
  deleteAllTasksForUser,
  deleteTask,
  getAllTasksForUser,
  getTaskById,
  updateTask,
} from "../../controllers";

export const tasksRouter = Router();

tasksRouter.post("/create", createTask);
tasksRouter.get("/tasks:userId", getAllTasksForUser);
tasksRouter.get("/task:id", getTaskById);
tasksRouter.put("/update", updateTask);
tasksRouter.delete("/delete:id", deleteTask);
tasksRouter.delete("/delete:userId", deleteAllTasksForUser);
