import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export const AddRepolikeService = async (data) => {
  const response = await axios.post(API_URL + `/api/like/unlike/${data}`,undefined, {
    headers:{

      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    }});
  
  return response.data;
};

const RepoLikeService = {
    AddRepolikeService,
   
  };
  export default RepoLikeService;