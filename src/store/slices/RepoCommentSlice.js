import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommentService from "../services/RepoCommentService";

export const AddRepoComment = createAsyncThunk(
    "repoComment/AddRepoComment",
    async (data, thunkAPI) => {
      try {
        const response = await CommentService.AddCommentService(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const GetRepoComment = createAsyncThunk(
    "repoComment/GetRepoComment",
    async (data, thunkAPI) => {
      try {
        const response = await CommentService.GetCommentByRepoService(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
const RepoCommentSlice = createSlice({
    name: "repoComment",
    initialState: {
      repoComments:[],
      message: "",
    },
   
    extraReducers: {
      [AddRepoComment.pending]: (state) => {
        state.message = ""
      },
      [AddRepoComment.fulfilled]: (state, action) => {
        // state.repoComments =[... state.repoComments, action.payload]
        state.message = action.payload

       },
      [AddRepoComment.rejected]: (state, action) => {
        
        state.message = action.payload;      
    },
    [GetRepoComment.pending]: (state) => {
        state.repoComments = []
        state.message = ""
      },
      [GetRepoComment.fulfilled]: (state, action) => {
        state.repoComments = action.payload
        state.message = ""
       },
      [GetRepoComment.rejected]: (state, action) => {
        state.repoComments = []
        state.message = action.payload;      
    },
    },
  });
  
  export default RepoCommentSlice.reducer;