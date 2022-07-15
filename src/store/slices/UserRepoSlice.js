import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RepoService from "../services/RepoService";

export const getUserRepository = createAsyncThunk(
  "userRepo/getUserRepository",
  async (thunkAPI) => {
    try {
      const response = RepoService.GetUserRepoService();
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

//if user come in from trending repo toh jiski repo hogi uss bande ki sari public repo dikhayenge bt if user khud ki repo dekhta hai tab sab dikhayenge
export const getUserRepositoryByTrending = createAsyncThunk(
  "userRepo/getUserRepositoryByTrending",
  async (repo_id,thunkAPI) => {
    try {
    
      const response = RepoService.GetUserRepoServiceByTrending(repo_id);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userRepositories: [],
  message: "",
  loading: false
};
const UserRepoSlice = createSlice({
  name: "userRepo",
  initialState,
  extraReducers: {
    [getUserRepository.pending]: (state) => {
      state.userRepositories = [];
      state.loading = true;

    },
    [getUserRepository.fulfilled]: (state, action) => {
      state.userRepositories = action.payload;
      state.message = "fullfilled";
      state.loading = false;
    },
    [getUserRepository.rejected]: (state, action) => {
      state.userRepositories = [];
      state.message = action.payload;
      state.loading = false;
      
    },

    //user repository through the another user
    [getUserRepositoryByTrending.pending]: (state) => {
      state.userRepositories = [];
    },
    [getUserRepositoryByTrending.fulfilled]: (state, action) => {
      state.userRepositories = action.payload;
      state.message = "fullfilled";
    },
    [getUserRepositoryByTrending.rejected]: (state, action) => {
      state.userRepositories = [];
      state.message = action.payload;
    },

  },
});

export default UserRepoSlice.reducer;
