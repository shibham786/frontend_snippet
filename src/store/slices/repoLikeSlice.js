import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RepoLikeService from "../services/repoLikesService"
import { getUserRepositoryDetail } from "./userRepoDetailSlice";

export const AddRepolike = createAsyncThunk(
    "repolike/AddRepolike",
    async (data, thunkAPI) => {
      try {
        const response = await RepoLikeService.AddRepolikeService(data);
        console.log("-=-=-=-=-AddRepoLike:", data)
        // thunkAPI.dispatch(getUserRepositoryDetail(data))
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
const RepoLikeSlice = createSlice({
    name: "repolike",
    initialState: {
     
      message: "",
      IsSuccess:false,
      IsError:false
    },
   
    extraReducers: {
      [AddRepolike.pending]: (state) => {
        state.message = ""
      },
      [AddRepolike.fulfilled]: (state, action) => {
       
        state.message = action.payload
        state.IsSuccess = true
      },
      [AddRepolike.rejected]: (state, action) => {
        debugger;
        state.message = action.payload;
        state.IsError = true
        
      },
    },
  });
  
  export default RepoLikeSlice.reducer;