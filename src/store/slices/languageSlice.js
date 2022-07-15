import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import langService from "../services/langService";

export const getlanguages = createAsyncThunk('lang/getlanguages',async(thunkAPI)=>{
    try {
        return await langService.getlangs()
    } catch (error) {
        const message = (error.response && error.response.data && error.message)
        thunkAPI.rejectWithValue(message)
    }
     
}) 

const initialState = {
    languages:[],
    message:''
}

 const LangSlice = createSlice({
    name:'lang',
    initialState,
   extraReducers:{
    [getlanguages.pending]: (state) => {
        state.languages = [];

      },
      [getlanguages.fulfilled]: (state,action) => {
        state.languages = action.payload;
      },
      [getlanguages.rejected]: (state,action) => {
        state.languages = [];
        state.message = action.payload
      },
   }

})

export  default LangSlice.reducer