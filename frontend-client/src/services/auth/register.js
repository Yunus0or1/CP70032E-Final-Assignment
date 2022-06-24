import api from "../api";

export async function register({ email, password, firstName, lastName }) {
  const dataRequest = {
    routeKey: "USER_REGISTER",
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  return api({ method: "post", data: dataRequest });
}
