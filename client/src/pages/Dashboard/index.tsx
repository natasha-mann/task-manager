import { Page } from "../../components/Page";
import {
  DashboardHeader,
  ManageBoardControls,
  StyledHeading,
  TaskBoard,
  TaskColumnHeader,
} from "./Dashboard.styled";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/cookies";
import { TaskData, useAllTasksQuery } from "../../api/useAllTasksQuery";
import { Task } from "../../components/Task";
import { CTAButton } from "../../components/CTAButton";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../services/TaskService";
import { Filter } from "../../components/Filter";
import { Column } from "../../components/Column";
import { SearchBar } from "../../components/SearchBar";
import { TaskModal } from "../../components/TaskModal";

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

  const [boardView, setBoardView] = useState<boolean>(true);

  const [selectedTask, setSelectedTask] = useState<TaskData | undefined>();
  const [showCreateTaskModal, setShowCreateTaskModal] =
    useState<boolean>(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState<boolean>(false);

  const deleteTaskMutation = useDeleteTaskMutation();
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
    }
  }, [navigate, tasks]);

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
        <TaskModal
          title="Create Task"
          handleClose={() => setShowCreateTaskModal((prev) => !prev)}
          showModal={showCreateTaskModal}
          refetch={refetch}
          submitMutation={createTaskMutation}
        />
      )}

      {showViewTaskModal && (
        <TaskModal
          title={selectedTask?.title ?? undefined}
          handleClose={() => setShowViewTaskModal((prev) => !prev)}
          showModal={showViewTaskModal}
          refetch={refetch}
          selectedTask={selectedTask}
          submitMutation={updateTaskMutation}
        />
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
            <CTAButton
              label="Add new task"
              onClick={() => setShowCreateTaskModal((prev) => !prev)}
            />
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
              <CTAButton
                label="Add new task"
                onClick={() => setShowCreateTaskModal((prev) => !prev)}
              />
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
                  <Column key={priority}>
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
                    <CTAButton
                      label="Add new task"
                      onClick={() => setShowCreateTaskModal((prev) => !prev)}
                    />
                  </Column>
                );
              }
            )}
        </TaskBoard>
      </Page>
    </>
  );
};
