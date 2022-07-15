import React, { useState } from "react";
import { Avatar, Grid, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserDetail,
  UpdateUserProfile,
} from "../../store/slices/loginSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled("input")({
  display: "none",
});
export default function EditProfile() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const dispatch = useDispatch();
  const [imgval, Setimgval] = useState(null);
  // const [UserData,SetUserData] = useSt
  const UserDetail = useSelector((state) => state?.login?.userDetail);

  const { message, IsSuccess } = useSelector((state) => state?.login);

  const [open, setOpen] = React.useState(false);
  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(GetUserDetail());
  }, []);

  // useEffect(() => {
  //   dispatch(GetUserDetail());
  // }, [dispatch]);

  const validationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });
  const formik = useFormik({
    initialValues: {
      username: UserDetail?.username,
      phone: UserDetail?.phone,
      profile_pic: UserDetail?.profile_pic,
      about:UserDetail?.about,
      github_link:UserDetail?.github_link ? UserDetail?.github_link : ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      imgval
        ? (values.profile_pic = imgval.image)
        : (values.profile_pic = UserDetail?.profile_pic);
      console.log("values in editprofile", values);

      let form_data = new FormData();
      form_data.append("username", values.username);
      form_data.append("phone", values.phone);
      form_data.append("about", values.about);
      form_data.append("github_link", values.github_link);
      if (imgval) {
        form_data.append("profile_pic", values.profile_pic);
      }
      dispatch(UpdateUserProfile(form_data));
      setOpen(true);
      // dispatch(GetUserDetail());
      //   setOpen(true);
      resetForm();
    },
  });
  console.log("message", message);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} mt={2}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              alignContent: "stretch",
              flexWrap: "wrap",
              left: 0,
            }}
          >
            <Avatar
              style={{ height: 250, width: 250 }}
              src={
                imgval
                  ? imgval.url
                  : `http://localhost:8000/${UserDetail?.profile_pic}`
              }
              alt=""
            />
            <label htmlFor="profile_pic">
              <Input
                accept="image/png, image/jpeg"
                id="profile_pic"
                onChange={(e) => {
                  Setimgval({
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  });
                  console.log(URL.createObjectURL(e.target.files[0]));
                }}
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ m: 3, padding: "20px" }}
          >
            <TextField
              margin="normal"
              fullWidth
              value={formik.values.username}
              id="username"
              label="Username"
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              name="username"
              onChange={formik.handleChange}
              autoFocus
            />
            <TextField
              disabled
              margin="normal"
              fullWidth
              value={UserDetail?.email}
              id="email"
              // label="email"
              name="email"
              type="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              value={formik.values.about}
              onChange={formik.handleChange}
              id="about"
              label="About"
              name="about"
              type="text"
              autoFocus
            />
             <TextField
              margin="normal"
              fullWidth
              value={formik.values.github_link}
              onChange={formik.handleChange}
              id="github_link"
              label="Github link"
              name="github_link"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              id="phone"
              label="phone"
              name="phone"
              autoFocus
            />
            <Button type="submit" variant="contained" size="large">
              update
            </Button>
          </Box>
        </Grid>

        <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
}
