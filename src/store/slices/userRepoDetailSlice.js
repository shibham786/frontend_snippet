import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RepoService from "../services/RepoService";

export const getUserRepositoryDetail = createAsyncThunk(
  "repoDetail/getUserRepositoryDetail",
  async (repo_id, thunkAPI) => {
    try {
        const response = RepoService.GetUserRepoDetailService(repo_id);
       
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  repoDetail: [],
  message: "",
  loading: false,
};

const repoDetailSlice = createSlice({
  name: "repoDetail",
  initialState: initialState,

  extraReducers: {
    [getUserRepositoryDetail.pending]: (state) => {
     
      state.repoDetail = [];
      state.loading = true;
    },
    [getUserRepositoryDetail.fulfilled]: (state, action) => {
    
      state.repoDetail = action.payload;
      state.loading = false;
    },
    [getUserRepositoryDetail.rejected]: (state, action) => {
       
      state.message = action.payload;
      state.loading = false;
      state.repoDetail = [];
    },
  },
});

export default repoDetailSlice.reducer;
