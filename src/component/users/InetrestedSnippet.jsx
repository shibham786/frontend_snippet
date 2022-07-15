import React from "react";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { NavLink } from "react-router-dom";

import {
  Grid,
  Card,
  CardMedia,
  Avatar,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { display } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTrendingRepositoryByChoices } from "../../store/slices/userLangChoiceSlice";
import { useState } from "react";

import EditLanguageChoice from "./EditLanguageChoice";
import Favorite from "@mui/icons-material/Favorite";

export default function InetrestedSnippet() {
  const [open, setOpen] = useState(false);
  const [Ischecked, setChecked] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTrendingRepositoryByChoices());
  }, []);

  const trendingrepo = useSelector((state) => state.userlangs.trendingRepo);
  console.log("trending", trendingrepo);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  //   0: "f29d7486-ade4-4b7d-b920-6d33feb4a14a"
  // 1: "9b358e6b-a30e-43f3-b6dd-8e7617d931d6"
  // 2: "0c4a175a-acd0-475d-a9dc-bd6aa0956697"

  return (
    <Grid container component="section" minHeight="70vh" mb={1}>
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          p={1}
        >
          <Typography
            variant="h5"
            fontFamily="unset"
            sx={{ m: 1 }}
            fontWeight="bold"
          >
            Your Interests
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="flex-end"
          p={1}
        >
          <Button onClick={openModal}>Edit Your Choice</Button>
        </Grid>
        {open && (
          <EditLanguageChoice
            key={trendingrepo}
            setOpen={setOpen}
            onClose={closeModal}
          />
        )}
        {trendingrepo.map((trendrepo) => {
          return (
        
            <Grid item md={6} lg={6} mt={2}>
              <Stack
                direction="row"
                padding={1}
                spacing={1}
                m={1}
                sx={{ background: "#E6F0F9", borderRadius: "10px" }}
              >
                <Card elevation={1}>
                  <div
                    style={{
                      // height: "auto",

                      margin: "3px",
                      padding: " 3px",
                    }}
                  >
                    <img
                      src={`http://localhost:8000/${trendrepo.lang_detail.lang_image}`}
                      height="90px"
                      width="100px"
                      padding="5px"
                      alt=""
                      style={{
                        bottom: 0,
                        top: 0,
                        left: 0,

                        marginLeft: "auto",
                        marginRight: "auto",
                        objectFit: "fill",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                </Card>

                <Stack direction="column" width="80%">
                  <Typography variant="h5" fontWeight="bold">
                    {trendrepo.title}
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      height: "auto",
                    }}
                  >
                    {trendrepo.desc}
                  </Typography>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "",
                    }}
                  >
                    <NavLink
                      to={`/UserRepoDetail/${trendrepo.repo_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        endIcon={
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        }
                      >
                        More
                      </Button>
                    </NavLink>
                  
                  </div>
                </Stack>
                <Typography variant="body1" style={{display:'flex',color:'blue'}}>
                      {trendrepo?.total_likes} <ThumbUpAltIcon sx={{color:'blue',marginLeft:'5px'}}/>
                  </Typography>
              </Stack>
            </Grid>
          );
        })}
      </>
    </Grid>
  );
}
