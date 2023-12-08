import styled, { css } from "styled-components";
import { StyledForm } from "../components/Form";
import { Page } from "../components/Page";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { setTokenCookie } from "../utils/cookies";
import { registerUser } from "../services/AuthService";
import { fetchWrapper } from "../utils/fetch";
import { REGISTER_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  token: string;
  email: string;
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
    mutationFn: registerUser,
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignupData) => {
    try {
      await signupMutation(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
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
