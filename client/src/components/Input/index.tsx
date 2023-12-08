import React, { InputHTMLAttributes } from "react";
import { StyledInputField } from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  required: boolean;
}

export const Input = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  placeholder,
  required,
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
