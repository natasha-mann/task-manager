import styled, { css } from "styled-components";

export const TaskBoard = styled.div(
  () => css`
    width: 90vw;
    height: 80vh;
    background-color: #282828;
    border-radius: 1rem;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    padding: 1.5rem 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  `
);

export const DashboardHeader = styled.h1(
  () => css`
    color: white;
    margin-bottom: 1.5rem;
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
