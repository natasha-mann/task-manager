import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Page } from "../components/Page";
import { useForm } from "react-hook-form";
import { storeSessionData, useLoginMutation } from "../services/AuthService";
import { Form } from "../components/Form";
import { useState } from "react";

export type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: LoginData) => {
    try {
      const authResponse = await loginMutation.mutateAsync(data);

      storeSessionData(authResponse);
      navigate("/dashboard");
    } catch (error) {
      if ("message" in error.data) {
        setLoginError(error.data.message);
      }
    }
  };

  return (
    <Page isCentered={true}>
      <Form
        heading="Login to Taskify"
        register={register}
        buttonLabel="Login"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={loginError}
      >
        <Input
          name="email"
          placeholder="Please enter your email address"
          error={errors.email?.message}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Please enter your password"
          error={errors.password?.message}
          required
        />
      </Form>
    </Page>
  );
};

export default Login;
