import axios from "axios";
const CHANGEME_API_URL = "https://mixyboos.dev.fergl.ie:5001/auth";
const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${CHANGEME_API_URL}/login?useCookies=true`,
    {
      email: username,
      password: password,
    },
    { withCredentials: true }
  );

  console.log("auth-service", "login", response);

  return response;
};

export { login };
