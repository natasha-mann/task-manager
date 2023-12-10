import React, { createElement } from "react";
import {
  StyledForm,
  StyledButton,
  StyledInputsContainer,
  StyledHeading,
  FormContainer,
  FormError,
} from "./Form.styled";
import { ReactNode } from "react";

export type StyledFormProps = {
  heading?: string;
  defaultValues?: any;
  children?: ReactNode;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  className?: string;
  error?: string;
  type?: "modal" | "normal";
};

export const Form = ({
  type = "normal",
  heading,
  buttonLabel = "Submit",
  children,
  onSubmit,
  handleSubmit,
  register,
  error,
  ...rest
}: StyledFormProps) => {
  return (
    <FormContainer>
      <StyledForm type={type} onSubmit={handleSubmit(onSubmit)} {...rest}>
        {heading && <StyledHeading>{heading}</StyledHeading>}
        <StyledInputsContainer type={type}>
          {Array.isArray(children)
            ? children.map((child) => {
                return child.props.name
                  ? createElement(child.type, {
                      ...{
                        ...child.props,
                        register,
                        key: child.props.name,
                      },
                    })
                  : child;
              })
            : children}
          <StyledButton type="submit">{buttonLabel}</StyledButton>
          {error && <FormError>{error}</FormError>}
        </StyledInputsContainer>
      </StyledForm>
    </FormContainer>
  );
};
