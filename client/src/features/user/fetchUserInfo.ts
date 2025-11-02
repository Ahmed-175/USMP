import axios from "axios";
import type { User } from "../../types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = import.meta.env.VITE_API_URL;
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const res = await axios.get(`${api}/api/user/info`, {
      withCredentials: true,
    });
    console.log(res.data.user);
    return res.data.user as User;
  }
);

export default fetchUserInfo;
