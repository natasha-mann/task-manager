import { Router } from "express";
import {
  createTask,
  deleteAllTasksForUser,
  deleteTask,
  getAllTasksForUser,
  getTaskById,
  updateTask,
} from "../../controllers";
import { auth } from "../../middleware/auth";

export const tasksRouter = Router();

tasksRouter.post("/create", auth, createTask);
tasksRouter.get("/tasks:userId", auth, getAllTasksForUser);
tasksRouter.get("/task:id", auth, getTaskById);
tasksRouter.put("/update", auth, updateTask);
tasksRouter.delete("/delete:id", auth, deleteTask);
tasksRouter.delete("/delete:userId", auth, deleteAllTasksForUser);
