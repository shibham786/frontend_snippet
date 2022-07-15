import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRepository } from "../../store/slices/UserRepoSlice";

import RepoService from "../services/RepoService";


export const AddRepo = createAsyncThunk(
  "repo/AddRepo",
  async (data, thunkAPI) => {
    try {
      debugger
      const response = await RepoService.AddRepoService(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const DeleteRepo = createAsyncThunk(
  "repo/DeleteRepo",
  async (data, thunkAPI) => {
    try {
      const response = await RepoService.DeleteRepoService(data);
      thunkAPI.dispatch(getUserRepository())
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const RepoSlice = createSlice({
  name: "repo",
  initialState: {
    // repositories: [],
    loading : false,
    message: "",
    IsSuccess:false,
    IsError:false
  },
  reducers:{

    reset: (state) => {
        state.IsError = false
        state.loading = false
        state.IsSuccess = false
        state.message = ''

    }
  },
  extraReducers: {
    [AddRepo.pending]: (state) => {
      state.loading = true
      state.IsSuccess = false
      state.IsError = false
    },
    [AddRepo.fulfilled]: (state, action) => {
    
      state.message = "Repository Created Successfully"
      state.IsSuccess = true
      state.loading = false
    },
    [AddRepo.rejected]: (state, action) => {
      debugger;
      state.message = action.payload;
      state.IsSuccess = false
      state.IsError = true
      state.loading = false
     
    },
    [DeleteRepo.pending]: (state) => {
      state.loading = true
      state.IsSuccess = false
      state.IsError = false
    },
    [DeleteRepo.fulfilled]: (state, action) => {
    
      state.message =action.payload
      state.IsSuccess = true
      state.loading = false
      state.IsError = false
    },
    [DeleteRepo.rejected]: (state, action) => {
      debugger;
      state.message = action.payload;
      state.IsSuccess = false
      state.IsError = true
      state.loading = false
     
    },
  },
});
export const {reset} = RepoSlice.actions
export default RepoSlice.reducer;
