import styled, { css } from "styled-components";

export const StyledInputField = styled.input(
  () => css`
    width: 80%;
    background-color: light-grey;
    border-radius: 1rem;
    margin: 0.5rem 0;
    height: 2rem;
    padding-left: 0.8rem;
  `
);
