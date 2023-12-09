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
