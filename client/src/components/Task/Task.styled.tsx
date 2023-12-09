import styled, { css } from "styled-components";

type TaskCardProps = {
  priority: string;
};

export const TaskCard = styled.div<TaskCardProps>`
  background-color: ${({ priority }) =>
    priority === "1" ? "#e23536" : "black"};
  color: white;
  border-radius: 1rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem 0;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

export const CardHeader = styled.div(
  () => css`
    height: 40%;
    display: flex;
    justify-content: space-between;
  `
);

export const ButtonsContainer = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
    width: 25%;
  `
);

export const CardBody = styled.div(
  () => css`
    height: 2rem;
  `
);

export const CardFooter = styled.div(
  () => css`
    height: 2rem;
    display: flex;
    justify-content: flex-end;
  `
);
