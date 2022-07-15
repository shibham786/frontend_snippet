import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import jwtDecode from "jwt-decode";
import axios from "axios";

const token_expire = (exp) => {
  return new Date() > new Date(exp * 1000);
};
const checkauth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.access) {
    const { iat, exp, user_id, ...rest } = jwtDecode(
      JSON.parse(localStorage.getItem("user")).access
    );

    if (token_expire(exp)) {
      const { iat, exp, user_id, ...rest } = jwtDecode(
        JSON.parse(localStorage.getItem("user")).refresh
      );
      if (token_expire(exp)) {
        localStorage.removeItem("user");
        return { user };
      }

      return axios
        .post("http://127.0.0.1:8000/users/login/refresh", {
          refresh: user.refresh,
        })
        .then((response) => {
          const data = response.data;
          if (data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            // const newUserToken = JSON.parse(data)
            // console.log("new token",newUserToken)
            const { token_type, jti, exp, ...rest } = jwtDecode(
              JSON.parse(localStorage.getItem("user")).access
            );
            return { token_type, exp, ...rest };
          }
        });
    }

    return { user, exp, ...rest };
  }

  return null;
};
export const LoginApi = createAsyncThunk(
  "login/LoginApi",
  async (user, thunkAPI) => {
    try {
       const response = await authService.loginUser(user);
       thunkAPI.dispatch(GetUserDetail())
       return response;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetUserDetail = createAsyncThunk(
  "login/GetUserDetail",
  async (thunkAPI) => {
    try {
      const response = await authService.GetUserDetail();
      return response;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateUserProfile = createAsyncThunk(
  "login/UpdateUserProfile",
  async (data, thunkAPI) => {
    try {
      const response = await authService.UpdateUserProfileService(data);
      thunkAPI.dispatch(GetUserDetail())
      return response;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RegisterApi = createAsyncThunk(
  "login/RegisterApi",
  async ({ username, email, password, password2 }, thunkAPI) => {
    try {
      const response = await authService.RegisterUser({
        username,
        email,
        password,
        password2,
      });
      localStorage.setItem("firstvisit", true);
      thunkAPI.dispatch(LoginApi({ email, password }));
      console.log("reponse in register", response);
      return response;
    } catch (error) {
      const message = error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserChangePassword = createAsyncThunk(
  "login/ChangePassword",
  async (data, thunkAPI) => {
    try {
      const response = await authService.ChangePasswordService(data);
      return response;
    } catch (error) {
      const message = error.message;
      console.log("msg", message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const user = checkauth();

const initialState = {
  user: user ? user : null,
  userDetail: null,
  loading: false,
  IsError: false,
  IsAuthenticate: false,
  IsSuccess: false,
  message: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      state.IsError = false;
      state.IsSuccess = false;
      state.loading = false;
      // state.userDetail = [];
    },
  },
  extraReducers: {
    [RegisterApi.pending]: (state) => {
      state.userDetail = [];
      state.loading = true;
    },
    [RegisterApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
      state.IsAuthenticate = true;
      state.IsSuccess = true;
      state.message = "Register SuccessFully";
    },
    [RegisterApi.rejected]: (state, action) => {
      debugger;
      state.loading = false;
      state.IsError = true;
      state.IsSuccess = false;
      state.IsAuthenticate = false;
      state.message = action.payload;
    },
    [LoginApi.pending]: (state) => {
      state.loading = true;
    },
    [LoginApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.IsSuccess = true;
      state.user = action.payload;
      state.IsAuthenticate = true;
      state.message = "login SuccessFully";
    },
    [LoginApi.rejected]: (state, action) => {
      state.loading = false;
      state.IsError = true;
      state.message = "InValid Credential";
      state.IsAuthenticate = false;
      state.IsSuccess = false;
      state.user = null;
    },
    [GetUserDetail.pending]: (state) => {
      state.loading = true;
      state.userDetail = [];
    },
    [GetUserDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.IsSuccess = true;
      state.userDetail = action.payload;
    },
    [GetUserDetail.rejected]: (state, action) => {
      state.loading = false;
      state.IsError = true;
      state.userDetail = [];
      // state.message = action.payload;
    },
    [UpdateUserProfile.pending]: (state) => {
      state.loading = true;
        state.userDetail = [];
    },
    [UpdateUserProfile.fulfilled]: (state, action) => {
      state.loading = false;
        state.IsSuccess = true;
        state.message = "Profile Update SuccessFully"
        state.userDetail = action.payload;
    },
    [UpdateUserProfile.rejected]: (state, action) => {
      state.loading = false;
      state.IsError = true;
      state.message = action.payload;
    },
    [UserChangePassword.pending]: (state) => {
      state.loading = true;
      state.message = "";
    },
    [UserChangePassword.fulfilled]: (state, action) => {
      state.loading = false;
        state.IsSuccess = true;
        state.message = "password changed SuccessFully";
    },
    [UserChangePassword.rejected]: (state, action) => {
      state.loading = false;
        state.IsError = true;
        state.message = action.payload;
    },
  },
});

export const { reset } = loginSlice.actions;
export default loginSlice.reducer;
