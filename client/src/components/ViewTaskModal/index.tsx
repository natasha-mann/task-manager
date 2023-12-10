import { useForm } from "react-hook-form";
import { TaskData } from "../../api/useAllTasksQuery";
import { Form } from "../Form";
import { Input, DropDown, TextArea } from "../Input";
import { Modal } from "../Modal";
import { useCallback, useState } from "react";
import { useUpdateTaskMutation } from "../../services/TaskService";

type ViewTaskProps = {
  handleClose: () => void;
  showModal: boolean;
  refetch: () => void;
  selectedTask?: TaskData;
};

export const ViewTaskModal = ({
  handleClose,
  showModal,
  refetch,
  selectedTask,
}: ViewTaskProps) => {
  const [editTaskError, setEditTaskError] = useState<string>("");

  const updateTaskMutation = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<TaskData, "_id">>({ defaultValues: selectedTask });

  const handleEditTask = useCallback(
    async (data: TaskData) => {
      try {
        await updateTaskMutation.mutateAsync(data);

        handleClose();

        reset();
        refetch();
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setEditTaskError(errorMessage);
      }
    },
    [updateTaskMutation, handleClose, refetch, reset]
  );

  return (
    <Modal onClose={handleClose} show={showModal}>
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
  );
};
