import { Form } from "../components/Form";
import { Page } from "../components/Page";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { storeSessionData, useRegisterMutation } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Signup = () => {
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
        if ("message" in error.data) {
          setSignupError(error.data.message);
        }
      }
    },
    [signupMutation, navigate]
  );

  return (
    <Page isCentered={true}>
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
    </Page>
  );
};

export default Signup;
