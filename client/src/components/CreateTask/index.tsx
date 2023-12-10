import { useForm } from "react-hook-form";
import { TaskData } from "../../api/useAllTasksQuery";
import { Form } from "../Form";
import { Input, DropDown, TextArea } from "../Input";
import { Modal } from "../Modal";
import { useCallback, useState } from "react";
import { useCreateTaskMutation } from "../../services/TaskService";

type CreateTaskProps = {
  handleShow: () => void;
  showModal: boolean;
  refetch: () => void;
};

export const CreateTaskModal = ({
  handleShow,
  showModal,
  refetch,
}: CreateTaskProps) => {
  const [createTaskError, setCreateTaskError] = useState<string>("");
  const createTaskMutation = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<TaskData, "_id">>();

  const handleCreateTask = useCallback(
    async (data: TaskData) => {
      try {
        await createTaskMutation.mutateAsync(data);

        handleShow();

        reset();
        refetch();
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setCreateTaskError(errorMessage);
      }
    },
    [createTaskMutation, handleShow, refetch, reset]
  );

  return (
    <Modal onClose={handleShow} show={showModal} title="Create Task">
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
  );
};
