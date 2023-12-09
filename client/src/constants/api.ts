const AUTH_URL = "http://localhost:8000/auth";
const TASKS_URL = "http://localhost:8000/task";

export const REGISTER_URL = `${AUTH_URL}/register`;
export const LOGIN_URL = `${AUTH_URL}/login`;

export const GET_TASKS = `${TASKS_URL}/tasks`;
export const CREATE_TASK = `${TASKS_URL}/create`;
export const DELETE_TASK = `${TASKS_URL}/delete`;
