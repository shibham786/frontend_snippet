import axios from "axios"

import jwtDecode from "jwt-decode";
const API_URL = "http://127.0.0.1:8000"


export const loginUser = async (user) => {

    const response = await axios.post(API_URL +"/users/login", user)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))

    }
    return response.data
}

export const RegisterUser = async (user) => {

    const response = await axios.post("http://127.0.0.1:8000/users/register", user)
    return response.data
}

export const GetUserDetail = async()=>{
  const { user_id, ...rest } = jwtDecode(
    JSON.parse(localStorage.getItem("user"))?.access
  );
    const params = {
        user_id: user_id,
      };
    const response = await axios.get("http://127.0.0.1:8000/users/getUserDetail", {
        params: params,
       headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
      }
    })
    return response.data
}

export const UpdateUserProfileService = async(data)=>{
  const { user_id, ...rest } = jwtDecode(
    JSON.parse(localStorage.getItem("user"))?.access
  );
const params = {
    user_id: user_id,
  };
const response = await axios.patch(`http://127.0.0.1:8000/users/update_profile/${user_id}`,data ,{
   headers:{

    'content-type': 'multipart/form-data',
     Accept: "application/json",
   "Content-Type": "application/json",


     Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
  }
})
return response.data
}

export const ChangePasswordService = async(data)=>{
  const { user_id, ...rest } = jwtDecode(
      JSON.parse(localStorage.getItem("user"))?.access
    );
  
  const response = await axios.put(`http://127.0.0.1:8000/users/changePassword/${user_id}`,data ,{
     headers:{
    'Content-Type': 'application/json',
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    }
  })
  return response.data
}


const authService = {
    loginUser,
    RegisterUser,
    GetUserDetail,
    UpdateUserProfileService,
    ChangePasswordService,
}

export default authService
