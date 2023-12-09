import React, { InputHTMLAttributes, PropsWithChildren } from "react";
import { StyledInputField } from "./Input.styled";

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
  ...rest
}: DropDownProps) => {
  return (
    <select {...register(name, { required: required })} {...rest}>
      {children}
    </select>
  );
};

export const TextArea = ({
  register,
  name,
  required,
  ...rest
}: TextAreaProps) => {
  return <textarea {...register(name, { required: required })} {...rest} />;
};
