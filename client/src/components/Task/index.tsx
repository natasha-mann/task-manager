import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PriorityLevel, Status } from "../../api/useAllTasksQuery";
import { ActionButton } from "../ActionButton";
import {
  ButtonsContainer,
  CardBody,
  CardFooter,
  CardHeader,
  TaskCard,
} from "./Task.styled";

export type TaskProps = {
  size: "large" | "small";
  _id: string;
  title: string;
  priorityLevel: PriorityLevel;
  status: Status;
  details?: string;
  deleteFn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editFn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const mapPriorityLevel = (level: string) => {
  switch (level) {
    case "1":
      return "High priority";
    case "2":
      return "Medium priority";
    case "3":
      return "Low priority";
    default:
      break;
  }
};

export const Task = ({
  size,
  title,
  priorityLevel,
  status,
  details,
  _id,
  deleteFn,
  editFn,
  onClick,
}: TaskProps) => {
  return (
    <>
      <TaskCard
        id={_id}
        priorityLevel={priorityLevel}
        size={size}
        onClick={onClick}
      >
        <CardHeader>
          <h3>{title}</h3>
          <ButtonsContainer>
            <ActionButton taskId={_id} onClick={editFn}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </ActionButton>
            <ActionButton taskId={_id} onClick={deleteFn}>
              <FontAwesomeIcon icon={faTrash} />
            </ActionButton>
          </ButtonsContainer>
        </CardHeader>
        <CardBody>
          <p>{mapPriorityLevel(priorityLevel)}</p>
        </CardBody>
        <CardFooter></CardFooter>
      </TaskCard>
    </>
  );
};
