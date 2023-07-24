import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Logout, setCredentials } from "./auhSlice";

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

export const register = createAsyncThunk(
  "user/register",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    console.log(formValue);
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users", formValue)
        .then(() => {
          navigate("/login");
        })
        .then(() => {
          toast.success("Registred  Successfully");
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios
        .put("http://localhost:5000/api/users/profile", formValue)
        .then(() => {
          dispatch(Logout());
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
    /////////////////////////////////////////////////////////
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registredUser = action.payload;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updatedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
