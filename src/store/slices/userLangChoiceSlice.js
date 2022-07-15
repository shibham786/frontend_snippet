import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import userLangService from "../services/userLangService";

export const  AddUserChoiceLanguge = createAsyncThunk("userlangs/AddUserChoiceLanguge",async(data,thunkAPI)=>{
    try {
        debugger
        const response = await userLangService.AddUserLanguage(data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
})


export const  UpdateUserChoiceLanguge = createAsyncThunk("userlangs/UpdateUserChoiceLanguge",async(data,thunkAPI)=>{
  try {
      
      const response = await userLangService.UpdateUserLanguage(data);
      thunkAPI.dispatch(GetTrendingRepositoryByChoices())
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
})

export const  GetUserChoiceLanguges = createAsyncThunk("userlangs/GetUserChoiceLanguges",async(thunkAPI)=>{
  try {
 
      const response = await userLangService.GetUserLanguages();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
})


export const  GetTrendingRepositoryByChoices = createAsyncThunk("userlangs/GetTrendingRepositoryByChoice",async(thunkAPI)=>{
  try {
     
      const response = await userLangService.GetTrendingRepositoryByChoice();
      console.log("response.data",response.data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    trendingRepo : [],
    userlangs:[],
    message : "",

}
const UserLanguage = createSlice({
    name:'userlangs',
    initialState,
    extraReducers: {
        [AddUserChoiceLanguge.pending]: (state) => {
          state.message = "";
          state.trendingRepo = []
        },
        [AddUserChoiceLanguge.fulfilled]: (state) => {
          state.trendingRepo = []
          state.message = "you Selected Language Successfully"
        },
        [AddUserChoiceLanguge.rejected]: (state, action) => {
          debugger;
          state.message = action.payload;
          state.trendingRepo = []
        },
        [UpdateUserChoiceLanguge.pending]: (state) => {
          state.message = "";
        
        },
        [UpdateUserChoiceLanguge.fulfilled]: (state) => {
         
          state.message = " User Choice  language Update SuccessFully"
        },
        [UpdateUserChoiceLanguge.rejected]: (state, action) => {
          debugger;
          state.message = action.payload;
      
        },

        //get
         [GetTrendingRepositoryByChoices.pending]: (state) => {
          state.trendingRepo = [];
          state.message = "pending";
        },
        [GetTrendingRepositoryByChoices.fulfilled]: (state, action) => {
          console.log("in service", action.payload);
          state.trendingRepo = action?.payload
          state.message = "success";
        },
        [GetTrendingRepositoryByChoices.rejected]: (state, action) => {
         
          state.message = action.payload;
          state.trendingRepo = [];
        },

        
        //get User Languages
        [GetUserChoiceLanguges.pending]: (state) => {
          state.userlangs = [];
          state.message = "pending";
        },
        [GetUserChoiceLanguges.fulfilled]: (state, action) => {
          console.log("in service", action.payload);
          state.userlangs = action.payload
          state.message = "success";
        },
        [GetUserChoiceLanguges.rejected]: (state, action) => {
         
          state.message = action.payload;
          state.userlangs = [];
        },

      },


})

export default UserLanguage.reducer