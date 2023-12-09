import { PropsWithChildren } from "react";
import { StyledButton } from "./ActionButton.styled";

type ActionButtonProps = PropsWithChildren<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>;

export const ActionButton = ({ children, onClick }: ActionButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
