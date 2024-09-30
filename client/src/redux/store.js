import { createSlice, configureStore } from "@reduxjs/toolkit";
// Manage login state globally

// Action Create
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLogin: false,
  },
  // reducers create
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

// exports Actions
export const authActions = authSlice.actions;
// create store
export const store = configureStore({
  // define reducer
  reducer: authSlice.reducer,
});
