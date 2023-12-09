import { StyledButton } from "./CTAButton.styled";

type CTAButtonProps = {
  label: string;
  onClick: () => void;
};

export const CTAButton = ({ label, onClick }: CTAButtonProps) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};
