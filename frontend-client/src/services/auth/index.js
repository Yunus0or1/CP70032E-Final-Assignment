import { login } from "./login";
import { register } from "./register";

const AuthService = {
  login: login,
  register: register,
};

Object.freeze(AuthService);
export default AuthService;
