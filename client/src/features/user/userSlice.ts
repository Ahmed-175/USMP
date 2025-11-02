import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import fetchUserInfo from "./fetchUserInfo";
interface initial {
  data: User | null;
  loading: boolean;
  error: any;
}
const initialState: initial = {
  data: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.message || "fetch api user info rejected";
      });
  },
});
export default userSlice.reducer;
