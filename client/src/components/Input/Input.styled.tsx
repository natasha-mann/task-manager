import styled, { css } from "styled-components";

export const StyledInputField = styled.input(
  () => css`
    width: 80%;
    background-color: light-grey;
    border-radius: 1rem;
    margin: 0.5rem 0;
    height: 3rem;
    padding-left: 0.8rem;
    padding-right: 2rem;
  `
);

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-right: 1rem;
`;

export const StyledLabel = styled.label`
  padding: 0 0.5rem;
`;

export const StyledSelect = styled.select`
  padding: 0.8rem;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  border-radius: 1rem;
  height: 8rem;
  margin: 2rem 0;
  padding: 0.8rem;
`;
