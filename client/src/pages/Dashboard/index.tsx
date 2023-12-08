import styled, { css } from "styled-components";
import { Page } from "../../components/Page";
import { DashboardHeader, TaskBoard } from "./Dashboard.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/cookies";
import { TaskData, useAllTasksQuery } from "../../api/useAllTasksQuery";
import { Task } from "../../components/Task";

export const TaskColumn = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    width: 30%;
    color: white;
  `
);

const TaskColumnHeader = styled.h2(
  () => css`
    font-weight: 500;
  `
);

type SortedTasks = {
  toDo: TaskData[] | [];
  inProgress: TaskData[] | [];
  done: TaskData[] | [];
};

const sortTasks = (tasks: TaskData[] | undefined): SortedTasks => {
  console.log({ tasks });
  const toDo = tasks?.filter((task) => task.status === "toDo") ?? [];
  const inProgress =
    tasks?.filter((task) => task.status === "inProgress") ?? [];
  const done = tasks?.filter((task) => task.status === "done") ?? [];

  return { toDo, inProgress, done };
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const tasks = useAllTasksQuery();

  const [sortedTasks, setSortedTasks] = useState<SortedTasks>(sortTasks(tasks));

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
    } else {
      const sorted = sortTasks(tasks);
      setSortedTasks(sorted);
    }
  }, [navigate, tasks]);

  return (
    <Page isCentered={true}>
      <DashboardHeader>Task Overview</DashboardHeader>

      <TaskBoard>
        <TaskColumn>
          <TaskColumnHeader>TO DO</TaskColumnHeader>
          {sortedTasks &&
            sortedTasks.toDo.map((task) => <Task key={task._id} {...task} />)}
        </TaskColumn>
        <TaskColumn>
          <TaskColumnHeader>IN PROGRESS</TaskColumnHeader>
          {sortedTasks &&
            sortedTasks.inProgress.map((task) => (
              <Task key={task._id} {...task} />
            ))}
        </TaskColumn>
        <TaskColumn>
          <TaskColumnHeader>DONE</TaskColumnHeader>
          {sortedTasks &&
            sortedTasks.done.map((task) => <Task key={task._id} {...task} />)}
        </TaskColumn>
      </TaskBoard>
    </Page>
  );
};
