import { PropsWithChildren } from "react";
import { StyledButton } from "./ActionButton.styled";

type ActionButtonProps = PropsWithChildren<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  taskId: string;
}>;

export const ActionButton = ({
  children,
  onClick,
  taskId,
}: ActionButtonProps) => {
  return (
    <StyledButton data-taskid={taskId} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
