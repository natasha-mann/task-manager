import styled, { css } from "styled-components";

export const StyledButton = styled.button(
  () => css`
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    margin-bottom: 0.3rem;
    &:hover {
      cursor: pointer;
      background-color: #282828;
      color: white;
    }
  `
);
