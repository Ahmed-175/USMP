import axios from "axios";
const api = import.meta.env.VITE_API_URL;
const fetchLoginApi = async (
  email: string,
  password: string
): Promise<boolean | undefined> => {
  try {
    const res = await axios.post(
      `${api}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data.success;
  } catch (error) {
    console.error("Error with login : ", error);
  }
};
export default fetchLoginApi;
