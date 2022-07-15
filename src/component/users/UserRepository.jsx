import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserRepository } from "../../store/slices/UserRepoSlice";
import {
  Grid,
  Box,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import noData from "../../assests/no-data-found.gif";
import RepoCard from "./RepoCard";
import loader from "../../assests/loading.gif";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function UserRepository() {
  const token = useSelector((state) => state.login.user);
  const [searchTerm, SetsearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("token outside", token);

  useEffect(() => {
    dispatch(getUserRepository());
  }, []);

  useEffect(() => {
    dispatch(getUserRepository());
  }, [token, dispatch]);

  const { userRepositories, loading } = useSelector((state) => state.userRepo);
  console.log("search", searchTerm);
  if (loading) {
    return (
      <Grid container>
        <Grid
          item
          md={12}
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <img
            src={loader}
            alt="simba2"
            style={{ width: "50", height: "50" }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "70vh" }}>
      <Grid container display="flex" alignItems="center">
        {userRepositories.length > 0 && (
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
            >
              <Typography
                variant="h5"
                fontFamily="unset"
                sx={{ m: 1 }}
                fontWeight="bold"
              >
                Your Snippets
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
            >
              {/* <TextField size="small" variant="outlined"  label="Search By Language"/> */}
              <FormControl sx={{ m: 1 }} variant="outlined" color="primary">
                <InputLabel htmlFor="search">Search by language</InputLabel>
                <OutlinedInput
                  onChange={(e) => {
                    SetsearchTerm(e.target.value);
                  }}
                  value={searchTerm}
                  id="search"
                  type="text"
                  justifyContent="center"
                  size="medium"
                  label="Search by language"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon
                        aria-label="toggle password visibility"
                        edge="end"
                        color="primary"
                      ></SearchIcon>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </>
        )}
        {userRepositories.length > 0 ? (
          userRepositories
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                String(val.lang_detail["lang_name"])
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((repo) => (
              <Grid key={repo.repo_id} item xs={12} sm={6} md={4} lg={3}>
                <center>
                  <RepoCard repo={repo} />
                </center>
              </Grid>
            ))
        ) : (
          <Grid container>
            <Button variant="contained" color="success" size="medium" endIcon={<AddCircleOutlineIcon/>}  sx={{ display:'flex',m:2,justifyItems:'end'}} onClick={()=>{
              navigate("/NewRepository")
            }}> Create Snippet</Button>
            <Grid
              item
              md={12}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <img
                src={noData}
                alt="simba2"
                style={{ width: "50", height: "50" }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
