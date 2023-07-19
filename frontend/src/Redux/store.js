import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./auhSlice";

const store = configureStore({
  reducer: { userRd: userReducer, auth: authReducer },
  devTools: true,
});

export default store;
