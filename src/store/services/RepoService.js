import axios from "axios";
import jwtDecode from "jwt-decode";
import { authHeader } from "./auth-header";
const API_URL = "http://127.0.0.1:8000";

const AddRepoService = async (data) => {
  const response = await axios.post(API_URL + "/api/repository/", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    },
  });

  return response.data;
};


const DeleteRepoService = async (data) => {
  debugger
  const response = await axios.delete(API_URL + "/api/DeleteRepository", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    },
    data
  });

  return response.data;
};

const user = JSON.parse(localStorage.getItem("user"));

//for user who is seeing its all repo
const GetUserRepoService = async () => {
  const { iat, exp, user_id, ...rest } = jwtDecode(
    JSON.parse(localStorage.getItem("user")).access
  );
  const params = {
    user: user_id,
  };

  const response = await axios.get("http://127.0.0.1:8000/api/repository/", {
    params: params,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).access,
    },
  });
  return response.data;
};

//for user who is seeing another user repo
const GetUserRepoServiceByTrending = async (repo_id) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/UserRepoByTrending/${repo_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).access,
      },
    }
  );
  return response.data;
};
const GetUserRepoDetailService = async (repo_id) => {
  const { iat, exp, user_id, ...rest } = jwtDecode(
    JSON.parse(localStorage.getItem("user")).access
  );
  const params = {
    repo_id: repo_id,
  };

  const response = await axios.get(
    `http://127.0.0.1:8000/api/RepoDetail/${repo_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).access,
      },
    }
  );
  return response.data;
};

const RepoService = {
  AddRepoService,
  DeleteRepoService,
  GetUserRepoService,
  GetUserRepoServiceByTrending,
  GetUserRepoDetailService,
};
export default RepoService;
