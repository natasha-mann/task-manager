import { useForm } from "react-hook-form";
import { TaskData } from "../../api/useAllTasksQuery";
import { Form } from "../Form";
import { Input, DropDown, TextArea } from "../Input";
import { Modal } from "../Modal";
import { useCallback, useState } from "react";

import { FlexDiv } from "../Layout.styled";
import { UseMutationResult } from "@tanstack/react-query";
import { TaskResponse } from "../../services/TaskService";

type TaskModalProps = {
  title?: string;
  handleClose: () => void;
  showModal: boolean;
  refetch: () => void;
  selectedTask?: TaskData;
  submitMutation: UseMutationResult<TaskResponse, Error, TaskData, unknown>;
};

type CreateTaskData = Omit<TaskData, "_id">;

export const TaskModal = ({
  title,
  handleClose,
  showModal,
  refetch,
  selectedTask,
  submitMutation,
}: TaskModalProps) => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateTaskData>({ defaultValues: selectedTask });

  const handleSubmitForm = useCallback(
    async (data: TaskData) => {
      try {
        await submitMutation.mutateAsync(data);

        handleClose();

        reset();

        refetch();
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setError(errorMessage);
      }
    },
    [handleClose, refetch, reset, submitMutation]
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const name = e.target.name as keyof CreateTaskData;

    setValue(name, value); // Replace 'yourSelectFieldName' with the actual name of your select field
  };

  const close = () => {
    reset();
    handleClose();
  };

  return (
    <Modal onClose={close} show={showModal} title={title}>
      <Form
        register={register}
        buttonLabel="Add task"
        handleSubmit={handleSubmit}
        onSubmit={handleSubmitForm}
        error={error}
        type="modal"
      >
        <Input
          name="title"
          error={errors.title?.message}
          required
          register={register}
          placeholder="Task Title"
        />
        <FlexDiv>
          <DropDown
            label="Task Status"
            name="status"
            register={register}
            onChange={handleSelectChange}
          >
            <option value="toDo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </DropDown>
          <DropDown
            label="Priority Level"
            name="priorityLevel"
            register={register}
            onChange={handleSelectChange}
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </DropDown>
        </FlexDiv>
        <TextArea name="details" register={register} />
      </Form>
    </Modal>
  );
};
