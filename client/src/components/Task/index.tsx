// import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EventHandler } from "react";
import { PriorityLevel, Status } from "../../api/useAllTasksQuery";
import { ActionButton } from "../ActionButton";
import {
  ButtonsContainer,
  CardBody,
  CardFooter,
  CardHeader,
  TaskCard,
} from "./Task.styled";

type TaskProps = {
  id: string;
  title: string;
  priorityLevel: PriorityLevel;
  status: Status;
  details?: string;
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

const handleEditTask = () => {};
const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
  const { currentTarget } = e;
  const testId = currentTarget.getAttribute("data-taskId");
  console.log({ testId });
};
const handleMoveTask = () => {};

export const Task = ({
  title,
  priorityLevel,
  status,
  details,
  id,
}: TaskProps) => {
  return (
    <TaskCard priority={priorityLevel}>
      <CardHeader>
        <h3>{title}</h3>
        <ButtonsContainer>
          <ActionButton data-taskId={id} onClick={handleEditTask}>
            Edit
            {/* <FontAwesomeIcon icon={faHouseLaptop} /> */}
          </ActionButton>
          <ActionButton data-taskId={id} onClick={handleDeleteTask}>
            Delete
            {/* <FontAwesomeIcon icon={faHouseLaptop} /> */}
          </ActionButton>
        </ButtonsContainer>
      </CardHeader>
      <CardBody>
        <p>{mapPriorityLevel(priorityLevel)}</p>
      </CardBody>
      <CardFooter>
        <ActionButton data-taskId={id} onClick={handleMoveTask}>
          Change Priority
          {/* <FontAwesomeIcon icon={faHouseLaptop} /> */}
        </ActionButton>
      </CardFooter>
    </TaskCard>
  );
};
