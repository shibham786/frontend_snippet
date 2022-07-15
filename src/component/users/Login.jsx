import * as React from "react";
import PropTypes from "prop-types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi, reset, RegisterApi } from "../../store/slices/loginSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import loginimg from "../../assests/logingif.gif";
import login from "../../assests/login.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  Box,
  Container,
  CssBaseline,
  Tabs,
  Tab,
  Typography,
  ThemeProvider,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  createTheme,
} from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

export default function Login() {
  const [value, setValue] = React.useState(0);
  const { IsSuccess, IsError, message } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //snack bar
  const [open, setOpen] = React.useState(false);
  const closeSnackbar = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Please Enter Username"),
    email: yup.string().required().email("Enter Valid Email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Must Contain 8 Characters, One Number and One Special Case Character"
      ),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
      dispatch(
        RegisterApi({
          username: values.username,
          email: values.email,
          password: values.password,
          password2: values.password2,
        })
      );

      resetForm();
    },
  });

  console.log(formik.values);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user", user);
    if (user) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    console.log("success", IsSuccess);
    if (IsSuccess) {
      setTimeout(() => {
        dispatch(reset());
        navigate("/");
      }, 1000);
    }
  }, [IsSuccess, dispatch]);

  //signin submit

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    const data = formik.values;
    if (data.password !== null && data.email != null) {
      dispatch(LoginApi({ email: data.email, password: data.password }));
      setOpen(true);
    } else {
      toast.error("please enter a data");
    }
  };

  // //sign up submit
  // const handleSignUpSubmit = (event) => {
  //   event.preventDefault();
  //   const data = formik.values;
  //   formik.handleSubmit(); // simple
  //   dispatch(
  //     RegisterApi({
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //       password2: data.password2,
  //     })
  //   );
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid direction="row" container spacing={2}>
      <Grid item md={6}>
        <Container
          style={{
            display: { md: "block", sm: "none", sx: "none" },
            justifyContent: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <img src={loginimg} alt="" height="600px" width="100%" />
        </Container>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%", margin: "20px auto" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="basic tabs example"
              >
                <Tab label="SignIn" {...a11yProps(0)} />
                <Tab label="SignUp" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={login}
                      sx={{ m: 1, bgcolor: "secondary.main" }}
                    >
                      {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSignInSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={formik.handleChange}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        onChange={formik.handleChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={login}
                      sx={{ m: 1, bgcolor: "secondary.main" }}
                    >
                      {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={formik.handleSubmit}
                      // onSubmit={formik.handleSubmit}
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                        label="Enter Your Name"
                        name="username"
                        type="text"
                        autoFocus
                      />

                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />

                      <TextField
                        margin="normal"
                        fullWidth
                        name="password2"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password2 &&
                          Boolean(formik.errors.password2)
                        }
                        helperText={
                          formik.touched.password2 && formik.errors.password2
                        }
                        label="Confirm Your Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                      />
                      {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </TabPanel>
          </Box>
        </Container>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        {IsSuccess ?
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
       : <Alert
       onClose={closeSnackbar}
       severity="error"
       sx={{ width: "100%" }}
     >
       {message}
     </Alert>}
      
      </Snackbar>
    </Grid>
  );
}
