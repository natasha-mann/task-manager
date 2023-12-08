import styled, { css } from "styled-components";

export const TaskCard = styled.div(
  () => css`
    background-color: black;
    color: white;
    border-radius: 1rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem;
  `
);
