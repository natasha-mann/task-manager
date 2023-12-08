import styled, { css } from "styled-components";

export const StyledFormContainer = styled.form(
  () => css`
    height: 85vh;
    width: 40vw;
    background-color: black;
    border-radius: 10%;
  `
);

export const StyledButton = styled.button(
  () => css`
    border-radius: 2rem;
    width: 15rem;
    height: 3rem;
    background-color: red;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 1rem 0;
  `
);

export const StyledInputsContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  `
);

export const StyledHeading = styled.h1(
  () => css`
    color: white;
    text-align: center;
  `
);
