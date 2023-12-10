import React, { InputHTMLAttributes, PropsWithChildren } from "react";
import {
  StyledInputContainer,
  StyledInputField,
  StyledLabel,
  StyledSelect,
  StyledTextArea,
} from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

interface DropDownProps extends InputProps, PropsWithChildren<{}> {}
interface TextAreaProps extends InputProps {}

export const Input = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  placeholder,
  required = true,
  ...rest
}: InputProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInputField
        placeholder={placeholder}
        {...register(name, { required: required })}
        {...rest}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export const DropDown = ({
  children,
  register,
  name,
  required,
  label,
  ...rest
}: DropDownProps) => {
  return (
    <StyledInputContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledSelect {...register(name, { required: required })} {...rest}>
        {children}
      </StyledSelect>
    </StyledInputContainer>
  );
};

export const TextArea = ({
  register,
  name,
  required,
  ...rest
}: TextAreaProps) => {
  return (
    <StyledTextArea
      placeholder="Add your task details here..."
      {...register(name, { required: required })}
      {...rest}
    />
  );
};
