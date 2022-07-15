import React, { useState } from "react";
import {
 
  Grid,
  Button,
  Stack,
 
  Typography,
  FormControl,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {UserChangePassword} from "../../store/slices/loginSlice"
import KeyIcon from '@mui/icons-material/Key';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  
export default function ChangePassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [status,Setstatus] = useState(null)
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const message = useSelector((state)=> state.login?.message)
  const IsSuccess = useSelector((state)=> state.login?.IsSuccess)
  
  const [values, setValues] = React.useState({
    showPassword: false,
    showNewPassword:false
  });
  
  const [open, setOpen] = React.useState(false);
  const closeSnackbar = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const validationSchema = yup.object().shape({
    old_password: yup.string().required("Required"),
    password: yup.string().required("Required"),
    password2: yup.string().required("Required"),
   
  });
  
  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      password2: "",
    },
    validationSchema:validationSchema,
    onSubmit:(values,{ resetForm })=>{
    const res =   dispatch(UserChangePassword(values))
      console.log(values);
      resetForm()
      setOpen(true);
     res.then((data)=>{
         if (data.meta["requestStatus"] === "fulfilled"){
          setTimeout(logoutHandler,3000)
         }
      })  
      
    }
  });



  return (
    <Grid
      position="static"
      container
      spacing={2}
      m={2}
      sx={{ justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Stack
          sx={{
            marginTop: 7,
            maxWidth: 550,
          }}
        >
           
          <Typography
            variant="h5"
            
            style={{ textAlign: "center", color: "black" }}
          >
            <KeyIcon/> Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ m: 1 }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="old_password">
               Old Password
              </InputLabel>
              <OutlinedInput
                id="old_password"
                onChange={formik.handleChange}
                value={formik.values.old_password}
                error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                helperText={formik.touched.old_password && formik.errors.old_password}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="password">
               New Password
              </InputLabel>
              <OutlinedInput
                id="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                type={values.showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="password2">
               Re-Enter Password
              </InputLabel>
              <OutlinedInput
                id="password2"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.password2}
                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                helperText={formik.touched.password2 && formik.errors.password2}
                type="text"
                label="Re-Enter Password"
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ backgroundColor: "black",m:1 }}
            >
              Send Message
            </Button>
          </Box>
        </Stack>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert
          onClose={closeSnackbar}
          severity={IsSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
