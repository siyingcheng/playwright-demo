import { LoginUser } from "../models";

const DEFAULT_PASSWORD = "secret_sauce";

export const STANDARD_USER: LoginUser = {
  username: "standard_user",
  password: DEFAULT_PASSWORD,
};

export const NON_EXIST_USER: LoginUser = {
  username: "non_exist_user",
  password: DEFAULT_PASSWORD,
};

export const LOCKED_OUT_USER: LoginUser = {
  username: "locked_out_user",
  password: DEFAULT_PASSWORD,
};

export const PROBLEM_USER: LoginUser = {
  username: "problem_user",
  password: DEFAULT_PASSWORD,
};

export const PERFORMANCE_GLITCH_USER: LoginUser = {
  username: "performance_glitch_user",
  password: DEFAULT_PASSWORD,
};

export const ERROR_USER: LoginUser = {
  username: "error_user",
  password: DEFAULT_PASSWORD,
};

export const VISUAL_USER: LoginUser = {
  username: "visual_user",
  password: DEFAULT_PASSWORD,
};
