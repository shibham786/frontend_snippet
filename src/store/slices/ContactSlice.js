import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const  AddContactMessage = createAsyncThunk("contactDetail/AddContactMessage",async(data,thunkAPI)=>{
    try {
        debugger
        const response = await axios.post("http://127.0.0.1:8000/api/contactus/",data)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
})




const initialState = {
    contactDetail: [],
    message: "",
    IsSuccess:false
  };
  const ContactSlice = createSlice({
    name: "contactDetail",
    initialState,
    extraReducers: {
      [AddContactMessage.pending]: (state) => {
        state.userRepositories = [];
      },
      [AddContactMessage.fulfilled]: (state, action) => {
        state.message ="Thank You Contacting Us";
        state.IsSuccess = true
      
      },
      [AddContactMessage.rejected]: (state, action) => {
        state.IsSuccess = true
        state.message = action.payload;
      },
    },
  });
  
  export default ContactSlice.reducer;