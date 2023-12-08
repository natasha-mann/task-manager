import { PriorityLevel, Status } from "../../api/useAllTasksQuery";
import { TaskCard } from "./Task.styled";

type TaskProps = {
  title: string;
  priorityLevel: PriorityLevel;
  status: Status;
  details?: string;
};

export const Task = ({ title, priorityLevel, status, details }: TaskProps) => {
  return (
    <TaskCard>
      <h2>{title}</h2>
      <p>{priorityLevel}</p>
    </TaskCard>
  );
};
