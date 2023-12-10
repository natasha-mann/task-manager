import styled, { css } from "styled-components";
import { StyledFormProps } from ".";

export const FormContainer = styled.div(
  () => css`
    display: flex;
    justify-content: center;
  `
);

export const StyledForm = styled.form<Pick<StyledFormProps, "type">>`
  width: 40vw;
  width: ${({ type }) => (type === "modal" ? "100%" : "40vw")};
  background-color: ${({ type }) => (type === "modal" ? "none" : "black")};
  border-radius: 10%;
  padding: 2rem;
`;

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

    &:hover {
      cursor: pointer;
      opacity: 80%;
    }
  `
);

export const StyledInputsContainer = styled.div<Pick<StyledFormProps, "type">>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ type }) => (type === "modal" ? "flex-start" : "center")};
`;

export const StyledHeading = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;

export const FormError = styled.p`
  color: red;
`;
