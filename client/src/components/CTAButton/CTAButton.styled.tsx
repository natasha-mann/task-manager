import styled, { css } from "styled-components";

export const StyledButton = styled.button(
  () => css`
    background-color: #ffffff;
    border-radius: 1rem;
    height: 2.5rem;
    margin: 0.5rem;
    padding: 0.5rem;

    &:hover {
      cursor: pointer;
      background-color: #282828;
      color: white;
    }
  `
);
