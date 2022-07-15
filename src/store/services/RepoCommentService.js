import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export const AddCommentService = async (data) => {
  const response = await axios.post(API_URL + "/api/RepositoryComment", data, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    },
  });

  return response.data;
};

export const GetCommentByRepoService = async (data) => {
  const params = {
    repo_id: data,
  };
  const response = await axios.get(API_URL + "/api/RepositoryComment", {
    params: params,
     headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
      }
  });

  return response.data;
};

const CommentService = {
  AddCommentService,
  GetCommentByRepoService,
};

export default CommentService;
