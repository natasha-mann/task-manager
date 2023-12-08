import styled, { css } from "styled-components";

export const FormContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    height: 100vh;
  `
);

export const StyledForm = styled.form(
  () => css`
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

export const FormError = styled.p(
  () => css`
    color: red;
  `
);
