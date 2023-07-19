import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials } from "./auhSlice";

export const login = createAsyncThunk(
  "user/login",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users/auth", formValue)
        .then((res) => {
          toast.success("Logged In Successfully");
          dispatch(setCredentials(res.data));
        })
        .then(() => {
          navigate("/");
        });
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
