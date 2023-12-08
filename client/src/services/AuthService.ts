import { SignupResponse } from "./../pages/signup";
import { REGISTER_URL } from "../constants/api";
import { SignupData } from "../pages/signup";
import { setTokenCookie } from "../utils/cookies";
import { fetchWrapper } from "../utils/fetch";

export const registerUser = async (data: SignupData) => {
  const response = await fetchWrapper<SignupResponse>(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const signupResponse = await Promise.resolve(response);
  localStorage.setItem("user", JSON.stringify(signupResponse.email));
  setTokenCookie(signupResponse.token);
  return signupResponse;
};
