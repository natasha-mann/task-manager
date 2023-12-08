import styled, { css } from "styled-components";
import { StyledForm } from "../components/Form";
import { Page } from "../components/Page";
import {
  Register,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { REGISTER_URL } from "../constants/api";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { fetchWrapper } from "../utils/fetch";

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const FormContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    height: 100vh;
  `
);

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const { mutateAsync: signupMutation } = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await fetchWrapper(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return Promise.resolve(response);
    },
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const response = await signupMutation(data);
      // const signupData = await response.json();
      console.log({ response });
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error or display error message to the user
    }
  };

  return (
    <Page isCentered={true}>
      <FormContainer>
        <StyledForm
          heading="Welcome to Taskify"
          register={register}
          buttonLabel="Register"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          <Input
            name="firstName"
            placeholder="Please enter your first name"
            error={errors.firstName?.message}
            required
          />
          <Input
            name="lastName"
            placeholder="Please enter your last name"
            error={errors.lastName?.message}
            required
          />
          <Input
            name="email"
            placeholder="Please enter your email address"
            error={errors.email?.message}
            required
          />
          <Input
            name="password"
            placeholder="Please choose a password"
            error={errors.password?.message}
            required
          />
        </StyledForm>
      </FormContainer>
    </Page>
  );
};

export default Signup;
