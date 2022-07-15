import React from 'react'
import {
    Grid,
    Card,
    CardMedia,
    Avatar,
    CardHeader,
    Typography,
    Button,
    Stack,
    Stack,
  } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { NavLink } from "react-router-dom";


export default function Card(props) {
  return (
    <div>
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
                      src={`http://localhost:8000/${props?.trendrepo?.lang_detail?.lang_image}`}
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
                    {props.trendrepo.title}
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
                    {props?.trendrepo?.desc}
                  </Typography>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "",
                    }}
                  >
                    <NavLink
                      to={`/UserRepoDetail/${props?.trendrepo?.repo_id}`}
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
                      {props.trendrepo?.total_likes} <ThumbUpAltIcon sx={{color:'blue',marginLeft:'5px'}}/>
                  </Typography>
              </Stack>
            </Grid>
    </div>
  )
}
