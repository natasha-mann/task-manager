import { useMutation } from "@tanstack/react-query";
import { CREATE_TASK } from "../constants/api";
import { fetchWrapper } from "../utils/fetch";
import { TaskData } from "../api/useAllTasksQuery";

type TaskResponse = {
  _id: string;
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
