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
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "../../services/TaskService";

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
  const [selectedTask, setSelectedTask] = useState<TaskData | undefined>();
  const [showCreateTaskModal, setShowCreateTaskModal] =
    useState<boolean>(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState<boolean>(false);
  const [createTaskError, setCreateTaskError] = useState<string>("");
  const [editTaskError, setEditTaskError] = useState<string>("");

  const createTaskMutation = useCreateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    setShowCreateTaskModal((prev) => !prev);
  };

  const handleCreateTask = useCallback(
    async (data: TaskData) => {
      try {
        await createTaskMutation.mutateAsync(data);

        setShowCreateTaskModal((prev) => !prev);
        reset();
        refetch();
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setCreateTaskError(errorMessage);
      }
    },
    [createTaskMutation, refetch, reset]
  );

  const handleDeleteTask = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const { currentTarget } = event;
      const taskId = currentTarget.getAttribute("data-taskId");

      try {
        if (taskId) {
          deleteTaskMutation.mutateAsync(taskId);

          setSortedTasks((prev) => {
            return {
              done: prev.done.filter((e) => e._id !== taskId),
              toDo: prev.toDo.filter((e) => e._id !== taskId),
              inProgress: prev.inProgress.filter((e) => e._id !== taskId),
            };
          });
        }
      } catch (error) {
        console.log({ error });
      }
    },
    [deleteTaskMutation]
  );

  const handleEditTask = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    // setShowModal((prev) => !prev);
  }, []);

  const handleOpenTask = (event: React.MouseEvent) => {
    const selectedId = event.currentTarget.getAttribute("id");
    const task = tasks?.find((task) => task._id === selectedId);

    setSelectedTask(task);

    setShowViewTaskModal((prev) => !prev);
  };

  const handleCloseViewTask = () => {
    setShowViewTaskModal((prev) => !prev);
    reset();
  };

  return (
    <>
      {showCreateTaskModal && (
        <Modal
          onClose={handleShowModel}
          show={showCreateTaskModal}
          title="Create Task"
        >
          <Form
            register={register}
            buttonLabel="Add task"
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

      {showViewTaskModal && (
        <Modal onClose={handleCloseViewTask} show={showViewTaskModal}>
          <Form
            register={register}
            buttonLabel="Save Changes"
            handleSubmit={handleSubmit}
            onSubmit={handleEditTask}
            error={editTaskError}
          >
            <Input
              label="Title"
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
              sortedTasks.toDo.map((task) => (
                <Task
                  key={task._id}
                  {...task}
                  deleteFn={handleDeleteTask}
                  editFn={handleEditTask}
                  onClick={handleOpenTask}
                />
              ))}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
          <TaskColumn>
            <TaskColumnHeader>IN PROGRESS</TaskColumnHeader>
            {sortedTasks &&
              sortedTasks.inProgress.map((task) => (
                <Task
                  key={task._id}
                  {...task}
                  deleteFn={handleDeleteTask}
                  editFn={handleEditTask}
                  onClick={handleOpenTask}
                />
              ))}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
          <TaskColumn>
            <TaskColumnHeader>DONE</TaskColumnHeader>
            {sortedTasks &&
              sortedTasks.done.map((task) => (
                <Task
                  key={task._id}
                  {...task}
                  deleteFn={handleDeleteTask}
                  editFn={handleEditTask}
                  onClick={handleOpenTask}
                />
              ))}
            <CTAButton label="Add new task" onClick={handleShowModel} />
          </TaskColumn>
        </TaskBoard>
      </Page>
    </>
  );
};
