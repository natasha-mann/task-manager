import { useMutation } from "@tanstack/react-query";
import { LOGIN_URL, REGISTER_URL } from "../constants/api";
import { LoginData } from "../pages/Login";
import { SignupData } from "../pages/Signup";
import { setTokenCookie } from "../utils/cookies";
import { fetchWrapper } from "../utils/fetch";

type AuthResponse = {
  token: string;
  user: { email: string; _id: string };
};

export const useRegisterMutation = () => {
  const signupMutation = useMutation({
    mutationFn: (requestBody: SignupData) => {
      return fetchWrapper<AuthResponse>(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    },
  });
  return signupMutation;
};

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationFn: (requestBody: LoginData) => {
      return fetchWrapper<AuthResponse>(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    },
  });
  return loginMutation;
};

export const storeSessionData = (data: AuthResponse) => {
  setTokenCookie(data.token);
};
