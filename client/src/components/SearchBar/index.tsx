import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StyledInputField } from "../Input/Input.styled";
import styled, { css } from "styled-components";

export const InputContainer = styled.div(
  () => css`
    position: relative;
  `
);

const StyledIcon = styled.span(
  () => css`
    position: absolute;
    right: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  `
);

type SearchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ onChange }: SearchProps) => {
  return (
    <InputContainer>
      <StyledInputField onChange={onChange} />
      <StyledIcon>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </StyledIcon>
    </InputContainer>
  );
};
