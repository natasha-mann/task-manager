import styled, { css } from "styled-components";

export const StyledButton = styled.button(
  () => css`
    background-color: #ffffff;
    border-radius: 1rem;
    height: 2.5rem;
    margin: 0.5rem;

    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  `
);
