import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    deleteUser: (state, action) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    logoutUser: (state, action) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFail,
  updateUserSuccess,
  deleteUser,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
