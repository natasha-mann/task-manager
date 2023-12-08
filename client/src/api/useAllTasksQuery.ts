import { useQuery } from "@tanstack/react-query";
import { GET_TASKS } from "../constants/api";
import { fetchWrapper } from "../utils/fetch";

export enum Status {
  inProgress = "inProgress",
  toDo = "toDo",
  done = "done",
}

export enum PriorityLevel {
  levelOne = "1",
  levelTwo = "2",
  levelThree = "3",
}

export type TaskData = {
  _id: string;
  title: string;
  details?: string;
  priorityLevel: PriorityLevel;
  status: Status;
};

export const useAllTasksQuery = () => {
  const fetchAllTasks = () => {
    return fetchWrapper<TaskData[]>(GET_TASKS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { data: tasks } = useQuery({
    queryFn: fetchAllTasks,
    queryKey: ["allTasks"],
  });

  return tasks;
};
