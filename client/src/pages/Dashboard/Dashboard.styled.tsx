import styled, { css } from "styled-components";

export const TaskBoard = styled.div(
  () => css`
    width: 90vw;
    background-color: #282828;
    border-radius: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 1.5rem 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
  `
);

export const DashboardHeader = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  `
);

export const StyledHeading = styled.h1(
  () => css`
    color: white;
  `
);

export const DashboardContainer = styled.div(
  () => css`
    color: white;
  `
);

export const TaskColumn = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    width: 30%;
    color: white;

    @media (max-width: 768px) {
      width: 90%;
    }
  `
);

export const TaskColumnHeader = styled.h2(
  () => css`
    font-weight: 500;
  `
);

export const ManageBoardControls = styled.div(
  () => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `
);
