import axios from "axios"

export const AddUserLanguage = async(data)=>{
  debugger;
    const response = await axios.post("http://127.0.0.1:8000/api/Userlang", data, {
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
        },
      });
      
      return response.data;
}

export const UpdateUserLanguage = async(data)=>{
  debugger;
    const response = await axios.put("http://127.0.0.1:8000/api/Userlang", data, {
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
        },
      });
      
      return response.data;
}

export const GetUserLanguages = async()=>{
  const response = await axios.get("http://127.0.0.1:8000/api/UserChoiceLangs",{
   
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    }

  })
  return response.data
}

export const GetTrendingRepositoryByChoice = async()=>{
  const response = await axios.get("http://127.0.0.1:8000/api/Userlang",{
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    }
  })

  return response.data;
}

const userLangService = {
    AddUserLanguage,
    GetTrendingRepositoryByChoice,
    UpdateUserLanguage,
    GetUserLanguages,
}

export default userLangService