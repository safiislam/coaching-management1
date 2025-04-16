import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.token = payload;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { logOut, loginUser } = authSlice.actions;
export default authSlice.reducer;
