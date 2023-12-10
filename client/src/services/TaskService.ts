import { useMutation } from "@tanstack/react-query";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../constants/api";
import { fetchWrapper } from "../utils/fetch";
import { TaskData } from "../api/useAllTasksQuery";

export type TaskResponse = {
  id: string;
};

export const useCreateTaskMutation = () => {
  const createTaskMutation = useMutation({
    mutationFn: (requestBody: TaskData) => {
      return fetchWrapper<TaskResponse>(CREATE_TASK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    },
  });
  return createTaskMutation;
};

export const useDeleteTaskMutation = () => {
  const deleteTaskMutation = useMutation({
    mutationFn: (requestBody: TaskData["_id"]) => {
      return fetchWrapper<TaskResponse>(`${DELETE_TASK}/${requestBody}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
  return deleteTaskMutation;
};

export const useUpdateTaskMutation = () => {
  const updateTaskMutation = useMutation({
    mutationFn: (requestBody: TaskData) => {
      return fetchWrapper<TaskResponse>(`${UPDATE_TASK}/${requestBody._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    },
  });
  return updateTaskMutation;
};
