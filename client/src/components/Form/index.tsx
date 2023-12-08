import React, { createElement } from "react";
import {
  StyledFormContainer,
  StyledButton,
  StyledInputsContainer,
  StyledHeading,
} from "./Form.styled";
import { ReactNode } from "react";

type StyledFormProps = {
  heading: string;
  defaultValues?: any;
  children?: ReactNode;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  className?: string;
};

export const StyledForm = ({
  heading,
  buttonLabel = "Submit",
  children,
  onSubmit,
  handleSubmit,
  register,
  ...rest
}: StyledFormProps) => {
  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit)} {...rest}>
      {heading && <StyledHeading>{heading}</StyledHeading>}
      <StyledInputsContainer>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? createElement(child.type, {
                    ...{ ...child.props, register, key: child.props.name },
                  })
                : child;
            })
          : children}
        <StyledButton type="submit">{buttonLabel}</StyledButton>
      </StyledInputsContainer>
    </StyledFormContainer>
  );
};
