import api from "../api";

export async function login({ email, password }) {
  const dataRequest = {
    routeKey: "USER_LOGIN",
    email: email,
    password: password,
  };

  return api({ method: "post", data: dataRequest });
}
