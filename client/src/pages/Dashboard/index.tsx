import styled, { css } from "styled-components";
import { Page } from "../../components/Page";
import {
  DashboardHeader,
  ManageBoardControls,
  StyledHeading,
  TaskBoard,
  TaskColumn,
  TaskColumnHeader,
} from "./Dashboard.styled";
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
import { Filter } from "../../components/Filter";
import { Column } from "../../components/Column";
import { SearchBar } from "../../components/SearchBar";
import { CreateTaskModal } from "../../components/CreateTask";

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
  const [filterValue, setFilterValue] =
    useState<Partial<Record<keyof TaskData, string>>>();
  const [filteredTasks, setFilteredTasks] = useState<TaskData[]>(tasks ?? []);

  const [boardView, setBoardView] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<TaskData | undefined>();
  const [showCreateTaskModal, setShowCreateTaskModal] =
    useState<boolean>(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState<boolean>(false);
  const [editTaskError, setEditTaskError] = useState<string>("");

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
    }
  }, [navigate, tasks]);

  const handleShowModel = () => {
    setShowCreateTaskModal((prev) => !prev);
  };

  const handleDeleteTask = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const { currentTarget } = event;
      const taskId = currentTarget.getAttribute("data-taskId");

      try {
        if (taskId) {
          deleteTaskMutation.mutateAsync(taskId);
          setFilteredTasks((prev) => prev.filter((e) => e._id !== taskId));
        }
      } catch (error) {
        console.log({ error });
      }
    },
    [deleteTaskMutation]
  );

  const handleEditTask = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setShowViewTaskModal((prev) => !prev);
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

  useEffect(() => {
    if (filterValue) {
      const [[key, value]] = Object.entries(filterValue);
      const taskProperty = key as keyof TaskData;
      const filteredTasks =
        tasks?.filter((task) => task[taskProperty]?.includes(value)) ?? [];
      setFilteredTasks(filteredTasks);
    } else {
      setFilteredTasks(tasks ?? []);
    }
  }, [filterValue, tasks]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue({ title: e.currentTarget.value });
  };

  return (
    <>
      {showCreateTaskModal && (
        <CreateTaskModal
          handleShow={handleShowModel}
          showModal={showCreateTaskModal}
          refetch={refetch}
        />
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
        <DashboardHeader>
          <StyledHeading>Task Overview</StyledHeading>
          <SearchBar onChange={handleOnChange} />
        </DashboardHeader>
        <ManageBoardControls>
          <div>
            <Filter onClick={setFilterValue} />
          </div>
          <div>
            <CTAButton label="Add new task" onClick={handleShowModel} />
            <CTAButton
              label={boardView ? "All Tasks" : "Task Board View"}
              onClick={() => setBoardView((prev) => !prev)}
            />
          </div>
        </ManageBoardControls>
        <TaskBoard>
          {!boardView && !filteredTasks.length && (
            <>
              <h1>No tasks!</h1>
              <CTAButton label="Add new task" onClick={handleShowModel} />
            </>
          )}
          {tasks &&
            !boardView &&
            filteredTasks.map((task) => {
              return (
                <Task
                  size="large"
                  key={task._id}
                  {...task}
                  onClick={handleOpenTask}
                  deleteFn={handleDeleteTask}
                  editFn={handleEditTask}
                />
              );
            })}

          {tasks &&
            boardView &&
            Object.entries(sortTasks(filteredTasks)).map(
              ([priority, tasks]) => {
                return (
                  <Column>
                    <TaskColumnHeader>
                      {priority === "todo"
                        ? "TO DO"
                        : priority === "inProgress"
                        ? "IN PROGRESS"
                        : "DONE"}
                    </TaskColumnHeader>
                    {tasks.length
                      ? tasks.map((task) => (
                          <Task
                            size="small"
                            key={task._id}
                            {...task}
                            deleteFn={handleDeleteTask}
                            editFn={handleEditTask}
                            onClick={handleOpenTask}
                          />
                        ))
                      : null}
                    <CTAButton label="Add new task" onClick={handleShowModel} />
                  </Column>
                );
              }
            )}
        </TaskBoard>
      </Page>
    </>
  );
};
