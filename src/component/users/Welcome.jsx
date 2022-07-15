import React from "react";
import homelogo from "../../assests/snippet-home.jpg";
import { Typography, Grid, Avatar } from "@mui/material";
import { margin } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LanguageChoicePopup from "./languageChoicePopup";
import { AddUserChoiceLanguge } from "../../store/slices/userLangChoiceSlice";
import jwtDecode from "jwt-decode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import customerService from "../../assests/customer-service.gif";
import favourite from "../../assests/favourite.gif";
import { useNavigate } from "react-router-dom";
import snippetCodeService from "../../assests/snippet-code-service.gif";
import bgHome from "../../assests/bg-home.gif"

const theme = createTheme({
  typography: {
    fontFamily: "unset",
  },
});

export default function Welcome() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [Ischecked, setChecked] = useState([]);
  const navigate = useNavigate();
  // const check = [];

  // console.log("user in welcome",user)

  useEffect(() => {
    let visited = localStorage.getItem("firstvisit");
    if (visited) {
      setShowModal(true);
      localStorage.removeItem("firstvisit");
    }
  }, []);

  const toggleCheckBoxChecked = (val) => {
    console.log(Ischecked);
    if (Ischecked.includes(val)) {
      let index = Ischecked.indexOf(val);
      Ischecked.splice(index);
    } else {
      setChecked([...Ischecked, val]);
    }
  };

  const handleModalclick = () => {
    const { iat, exp, user_id, ...rest } = jwtDecode(
      JSON.parse(localStorage.getItem("user"))?.access
    );
    console.log("Modal Clicked");
    dispatch(AddUserChoiceLanguge({ user_id: user_id, lang_id: Ischecked }));
    setShowModal(false);
  };
  console.log("checked array", Ischecked);
  return (
    <>
      {!showModal ? (
        <div style={{
         
            backgroundImage:`url(${bgHome})`,
            backgroundRepeat:'repeat'
        
        }}>
          <Grid
            position="static"
            display="flex"
          
            justifyContent="center"
            container
          >
            <Grid item sm={12} md={6} sx={{ padding: { md: 10, sm: 0 } }}>
              <Typography
                variant="h4"
                style={{
                  fontWeight: "bolder",
                  marginTop: "30px",
                  display: "flex",
                  color: "#0072b8",
                  justifyContent: "center",
                }}
              >
                Where The World Builds Software Lets Change World With Your Idea
              </Typography>
              <Typography
                variant="body1"
                style={{
                  margin: { md: "10px", sm: 0 },
                  justifyContent: "center",
                  color: "#0072b8",
                  padding: { md: 10, sm: 10 },
                }}
              >
                Millions of developers and companies build, ship, and maintain
                their software on GitHub the largest and most advanced
                development platform in the world.
              </Typography>
            </Grid>

            <Grid
              item
              sm={12}
              md={6}
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={homelogo} width="600px" margin="auto" alt="" />
            </Grid>
          </Grid>
          <Grid container mt={3}>
            <Grid
              item
              component="section"
              xs={12}
              sm={12}
              md={12}
              m={3}
              sx={{
                m: 0,
                p: 0,
                display: "flex",
                justifyContent: { md: "left", sm: "center" },
                backgroundColor: "#0072b8",
                color: "#efefef",
              }}
            >
              <Typography variant="h4" padding={2}>
                {" "}
                Welcome To CodeSnippet{" "}
              </Typography>
            </Grid>

            <Grid
              item
              component="section"
              sm={12}
              md={12}
              sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0072b8",
                color: "#efefef",
              }}
            >
              <Typography
                variant="body"
                fontSize="16px"
                sx={{
                  fontFamily: "Open Sans, sans-serif",
                  lineHeight: "24px",
                  fontWeight: 300,
                }}
              >
                Code Snippet is leading Software Development IT Company in Surat
                To Achieve excellence in providing the best IT solutions to
                customers to meet their present and future business needs in the
                most efficient and effective way.
              </Typography>
            </Grid>
            <Grid
              item
              component="section"
              sm={12}
              md={12}
              sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0072b8",
                color: "#efefef",
              }}
            >
              <Typography
                variant="body"
                fontSize="16px"
                sx={{
                  fontFamily: "Open Sans, sans-serif",
                  lineHeight: "24px",
                  fontWeight: 300,
                }}
              >
                Code Snippet is leading Software Development IT Company in Surat
                To Achieve excellence in providing the best IT solutions to
                customers to meet their present and future business needs in the
                most efficient and effective way.
              </Typography>
            </Grid>
          </Grid>
          <Grid container m={1}>
            <Grid
              item
              sm={12}
              md={12}
              sx={{
                m: 3,
                display: "flex",

                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "#fff",
                color: "#0072b8",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Open Sans, sans-serif",
                  lineHeight: "24px",
                  fontWeight: "bold",
                }}
              >
                Our Service
              </Typography>
            </Grid>
          </Grid>
          <Grid container p={2}>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <div
                onClick={()=>{
                  if(localStorage.getItem("user")){
                    navigate("/NewRepository")
                  }
                  else{
                    navigate("/login")
                  }
               
                }}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  cursor:'pointer',
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={snippetCodeService}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#0072b8"
                >
                  Make Snippet
                </Typography>
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <div
                onClick={()=>{
                  if(localStorage.getItem("user")){
                    navigate("/TrendingRepo")
                  }
                  else{
                    navigate("/login")
                  }
                
                }}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  cursor:'pointer',
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={favourite}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#0072b8"
                >
                  Your Interests
                </Typography>
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <div
                onClick={()=>{
                  if(localStorage.getItem("user")){
                    navigate("/Contact")
                  }
                  else{
                    navigate("/login")
                  }
                 
                }}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  cursor:'pointer',
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={customerService}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#0072b8"
                >
                  Customer Service
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <LanguageChoicePopup
          toggleCheckBoxChecked={toggleCheckBoxChecked}
          onClick={handleModalclick}
        />
      )}
    </>
  );
}
