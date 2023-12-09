import styled, { css } from "styled-components";
import { Page } from "../../components/Page";
import { DashboardHeader, TaskBoard } from "./Dashboard.styled";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/cookies";
import { TaskData, useAllTasksQuery } from "../../api/useAllTasksQuery";
import { Task } from "../../components/Task";
import { CTAButton } from "../../components/CTAButton";
import { Modal } from "../../components/Modal";
import { Form } from "../../components/Form";
import { DropDown, Input, TextArea } from "../../components/Input";
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../../services/TaskService";

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
  const toDo = tasks?.filter((task) => task.status === "toDo") ?? [];
  const inProgress =
    tasks?.filter((task) => task.status === "inProgress") ?? [];
  const done = tasks?.filter((task) => task.status === "done") ?? [];

  return { toDo, inProgress, done };
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, refetch } = useAllTasksQuery();

  const [sortedTasks, setSortedTasks] = useState<SortedTasks>(sortTasks(tasks));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createTaskError, setCreateTaskError] = useState();

  const createTaskMutation = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TaskData, "_id">>();

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
    } else {
      const sorted = sortTasks(tasks);
      setSortedTasks(sorted);
    }
  }, [navigate, tasks]);

  const handleShowModel = () => {
    setShowModal((prev) => !prev);
  };

  const handleCreateTask = useCallback(
    async (data: TaskData) => {
      try {
        const apiResponse = await createTaskMutation.mutateAsync(data);

        setShowModal((prev) => !prev);

        refetch();
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setCreateTaskError(errorMessage);
      }
    },
    [createTaskMutation]
  );

  return (
    <>
      {showModal && (
        <Modal onClose={handleShowModel} show={showModal} title="Create Task">
          <Form
            register={register}
            buttonLabel="Register"
            handleSubmit={handleSubmit}
            onSubmit={handleCreateTask}
            error={createTaskError}
          >
            <Input
              label="Add title"
              name="title"
              error={errors.title?.message}
              required
              register={register}
            />
            <DropDown name="status" register={register}>
              <option value="toDo">toDo</option>
              <option value="inProgress">inProgress</option>
              <option value="done">done</option>
            </DropDown>
            <DropDown name="priorityLevel" register={register}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </DropDown>
            <TextArea name="details" register={register} />
          </Form>
        </Modal>
      )}
      <Page isCentered={true}>
        <DashboardHeader>Task Overview</DashboardHeader>

        <TaskBoard>
          <TaskColumn>
            <TaskColumnHeader>TO DO</TaskColumnHeader>
            {sortedTasks &&
              sortedTasks.toDo.map((task) => <Task key={task._id} {...task} />)}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
          <TaskColumn>
            <TaskColumnHeader>IN PROGRESS</TaskColumnHeader>
            {sortedTasks &&
              sortedTasks.inProgress.map((task) => (
                <Task key={task._id} {...task} />
              ))}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
          <TaskColumn>
            <TaskColumnHeader>DONE</TaskColumnHeader>
            {sortedTasks &&
              sortedTasks.done.map((task) => <Task key={task._id} {...task} />)}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
        </TaskBoard>
      </Page>
    </>
  );
};
