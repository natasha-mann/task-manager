import { Form } from "../../components/Form";
import { Page } from "../../components/Page";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import {
  storeSessionData,
  useRegisterMutation,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { CenteredFlexContainer } from "../../components/Layout.styled";

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const Signup = () => {
  const [signupError, setSignupError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const signupMutation = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SignupData) => {
      try {
        const authResponse = await signupMutation.mutateAsync(data);
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
            name="password"
            type="password"
            placeholder="Please choose a password"
            error={errors.password?.message}
            required
          />
        </Form>
      </CenteredFlexContainer>
    </Page>
  );
};
