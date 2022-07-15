import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Editor from "@monaco-editor/react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Avatar,
  Divider,
  Grid,
  Checkbox,
  IconButton,
  Card,
  CardHeader,
  Stack,
  Typography,
  Button,
  CardContent,
} from "@mui/material";
import { Container } from "@mui/system";
import { getUserRepositoryDetail } from "../../store/slices/userRepoDetailSlice";
import { getUserRepositoryByTrending } from "../../store/slices/UserRepoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { AddRepolike } from "../../store/slices/repoLikeSlice";
import GitHubIcon from '@mui/icons-material/GitHub';
import RepoComment from "./RepoComment";
import CommentView from "./CommentView";
import loader from "../../assests/loading.gif"
import jwtDecode from "jwt-decode";

export default function UserRepoDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const repoDetail = useSelector((state) => {
    return state?.repoDetail?.repoDetail;
  });

  const repos = useSelector((state) => state?.userRepo?.userRepositories);
  const pageloading = useSelector((state)=> state?.repoDetail?.loading)

  const [dark, setdark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
    
  const [isLiked, setIsLiked] = useState(false);

  const { user_id } = jwtDecode(
    JSON.parse(localStorage.getItem("user"))?.access
  );

  
  useEffect(() => {
    console.log("in useEffect", id);
    dispatch(getUserRepositoryDetail(id));
    dispatch(getUserRepositoryByTrending(id));
  }, [id]);


  useEffect(() => {
    console.log(repoDetail, "=========================");
    setIsLiked(repoDetail?.likes?.includes(user_id));

 
    !!Object.keys(repoDetail).length && setIsLoading(false);
  }, [repoDetail]);

  
  const repoLikeHandler = () => {
    console.log("like", repoDetail?.repo_id);
    dispatch(AddRepolike(repoDetail?.repo_id));
    setIsLiked((prev) => !prev);
    //setIsclick(true)
  };
 
  if (pageloading) {
    return (
      <Grid container>
        <Grid item md={12} display="flex" flexDirection="row" justifyContent="center">
          <img
            src={loader}
            alt="simba2"
            style={{ width: "50", height: "50" }}
          />
        </Grid>
      </Grid>

    );
  }

  console.log("repos repos:", repos);
  console.log("user id", user_id);
 

  return (
    <Stack position="sticky" direction="row">
      <Box sx={{ flex: 4, mt: 2 }}>
        <Stack
          direction="column"
          sx={{ alignItems: { sm: "center", md: "flex-start" } }}
        >
          <Typography variant="h4" fontWeight="bolder" m={1}>
            {repoDetail?.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
                color: "gray",
                margin: { sm: 1, md: 2 },
              },
            }}
            p={1}
          >
            {repoDetail?.desc}
          </Typography>
          <Container
            variant="div"
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "transparent",
                color: "#fff",
                bottom: 0,
                display: "flex",
                alignItems: "center",
                right: 30,
                position: "absolute",
                zIndex: 1,
              }}
            >
              <IconButton aria-label="add to favorites">
                <Checkbox
                  onClick={repoLikeHandler}
                  checkedIcon={
                    isLiked ? (
                      <Favorite sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorder sx={{ color: dark ? "#fff" : "#000" }} />
                    )
                  }
                  icon={
                    isLiked ? (
                      <Favorite sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorder sx={{ color: dark ? "#fff" : "#000" }} />
                    )
                  }
                />
              </IconButton>

              {dark ? (
                <DarkModeIcon
                  onClick={() => {
                    setdark(!dark);
                  }}
                />
              ) : (
                <LightModeIcon
                  color="primary"
                  onClick={() => {
                    setdark(!dark);
                  }}
                />
              )}
            </div>

            <div style={{ position: "relative", marginTop: "20px", overflow: 'hidden' }}>
              {isLoading ? (
                <div>Loading</div>
              ) : (
                <Editor
                  maxHeight="50vh"
                  height="50vh"
                  padding="15px"
                  margin={{ sm: "20px", md: "10px" }}
                  theme={dark ? "vs-dark" : "vs-light"}
                  value={repoDetail?.code}
                  options={{ domReadOnly: true, readOnly: true }}
                  language={String(
                    repoDetail?.lang_detail?.lang_name
                  ).toLowerCase()}
                  // defaultLanguage={String(
                  //   repoDetail?.lang_detail?.lang_name
                  // ).toLowerCase()}
                  // defaultValue={repoDetail?.code}
                />
              )}
            </div>
          </Container>

          <RepoComment key={repoDetail?.repo_id} repo={repoDetail} />
        </Stack>
        <CommentView key={repoDetail?.repo_id} repo={id} />
      </Box>
      {/* <Divider orientation="vertical" flexItem />  right side ka part*/}
      <Box
        boxShadow="-5px 0px 0px 0px #aaaaaa30"
        sx={{
          flex: 2,
          padding: 1,
          margin: 0,
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <Stack
          direction="column"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            src={`http://localhost:8000/${repoDetail?.user_detail?.profile_pic}`}
            sx={{ height: "165px", width: "165px", mt: 1 }}
          />
          <Typography variant="subtitle1" fontWeight="bolder">
            {String(repoDetail?.user_detail?.username).toUpperCase()}
          </Typography>
          <Typography variant="body2" m={1} sx={{ color: "gray" ,fontWeight:'bold'}}>
           {repoDetail?.user_detail?.about}
          </Typography>
          <a href={repoDetail?.user_detail?.github_link} style={{textDecoration:'none'}} target="_blank">
          <Typography
          
            variant="contained"
            onClick={()=>{

            }}
            size="large"
            sx={{ justifyContent: "flex-start",color:'black', borderRadius:'100%' }}
          
          >
            <GitHubIcon/>
          </Typography>
          </a>
          <Divider />
          <div>    
            <Typography variant="h4" fontWeight="bold" m={2} >
            More From Snippet
          </Typography>
          </div>
 
        </Stack>
        <Stack
          direction="column"
          mt={1}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Scrollbars
            autoHeight={true}
            autoHeightMax={"calc(100vh - 100px)"}
            style={{ width: 445 }}
          >
            {repos?.map((repo) => {
              if (repoDetail?.repo_id !== repo.repo_id) {
                return (
                  <Card
                    onClick={() => {
                      setIsLoading(true);
                      navigate(`/UserRepoDetail/${repo.repo_id}`);
                    }}
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      marginBottom: "12px",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      pr: 1,
                      alignItems: "center",
                      minWidth: 345,
                      boxShadow:'-5px -5px -5px gray'
                    }}
                    m={2}
                    elevation={3}
                  >
                    <Box flex flexDirection="column">
                      <CardHeader
                        avatar={
                          <Avatar
                            src={`http://localhost:8000/${repo?.user_detail?.profile_pic}`}
                            sx={{ bgcolor: "red", height: 30, width: 30 }}
                            aria-label="recipe"
                          />
                        }
                        mb={0}
                        title={
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            {repo.title}
                          </Typography>
                        }
                      />

                      <CardContent sx={{ py: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            height: "auto",
                          }}
                          fontWeight="bold"
                        >
                          {repo.desc}
                        </Typography>
                      </CardContent>
                    </Box>

                    <img
                      src={`http://localhost:8000/${repo?.lang_detail?.lang_image}`}
                      height={75}
                      width={75}
                      alt="simba"
                    />
                  </Card>
                );
              }
            })}
          </Scrollbars>
        </Stack>
      </Box>
    </Stack>
  );
}
