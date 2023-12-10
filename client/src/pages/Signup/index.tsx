import { Form } from "../../components/Form";
import { Page } from "../../components/Page";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import {
  storeSessionData,
  useRegisterMutation,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { CenteredFlexContainer } from "../../components/Layout.styled";
import { StyledLink, StyledWhiteP } from "../../globalStyles";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type SignupData = Omit<FormData, "confirmPassword">;

export const Signup = () => {
  const [signupError, setSignupError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const signupMutation = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        const { firstName, lastName, email, password } = data;
        const authResponse = await signupMutation.mutateAsync({
          firstName,
          lastName,
          email,
          password,
        });
        storeSessionData(authResponse);
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error?.data?.message ?? error;
        setSignupError(errorMessage);
      }
    },
    [signupMutation, navigate]
  );

  return (
    <Page isCentered={true} hasBackgroundImage={true}>
      <CenteredFlexContainer>
        <Form
          heading="Welcome to Taskify"
          register={register}
          buttonLabel="Register"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          error={signupError}
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
            type="password"
            placeholder="Please choose a password"
            error={errors.password?.message}
            required
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should have at least 8 characters",
              },
            })}
          />
          <Input
            type="password"
            placeholder="Please confirm your password"
            error={errors.confirmPassword?.message}
            required
            {...register("confirmPassword", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <StyledWhiteP>
            Already registered? Click <StyledLink to="/login">here</StyledLink>{" "}
            to login.
          </StyledWhiteP>
        </Form>
      </CenteredFlexContainer>
    </Page>
  );
};
