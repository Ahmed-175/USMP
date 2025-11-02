import axios from "axios";
const api = import.meta.env.VITE_API_URL;
const fetchSignUpApi = async (
  username: string,
  email: string,
  password: string
): Promise<boolean | undefined> => {
  try {
    const res = await axios.post(
      `${api}/api/auth/sign-up`,
      { username, email, password },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data.success;
  } catch (error) {
    console.error("Error with login : ", error);
  }
};
export default fetchSignUpApi;
