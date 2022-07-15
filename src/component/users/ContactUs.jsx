import React from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import contactlogo from "../../assests/contact2.jpg";

import {AddContactMessage} from "../../store/slices/ContactSlice"
import {useDispatch,useSelector} from "react-redux"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ContactUs() {

  const dispatch = useDispatch()

  const message = useSelector((state) => state.contactDetail.message);
  const IsSuccess = useSelector((state) => state.contactDetail.IsSuccess);
  const [open, setOpen] = React.useState(false);
  const closeSnackbar = () => {
    setOpen(false);
  };



  const validationSchema = yup.object().shape({
    cname: yup.string().required("Required"),
    cemail: yup.string().email("Invalid Email").required("Required"),
    cmessage: yup.string().required("Required"),
   
  });
  const formik = useFormik({
    initialValues: {
      cname: "",
      cemail: "",
      cmessage: "",
    },
    validationSchema:validationSchema,
    onSubmit:(values,{ resetForm })=>{
      dispatch(AddContactMessage(values))
      setOpen(true);
      resetForm()
    }
  });


  return (
    <Grid position='static' container spacing={1}>
      <Grid item xs={12} sm={12} md={6} sx={{alignItems:'center'}}>
        <Box
          component="img"
          sx={{
            width:600,
            alignSelf: "center",
          }}
          alt="The house from the offer."
          src={contactlogo}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}  sx={{alignItems:'center',justifyContent:'center'}}>
        <Stack
          
          sx={{
            marginTop: 8,
            maxWidth:550,
      }}
        >
            <Typography variant="h4" style={{textAlign:'center',color:'black'}}>Contact Us </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ m: 1}}>
            <TextField
              margin="normal"
              fullWidth
              value={formik.values.cname}
              onChange={formik.handleChange}
              error={formik.touched.cname && Boolean(formik.errors.cname)}
              helperText={formik.touched.cname && formik.errors.cname}
              label="Your Name"
              name="cname"
              type="text"
              id="cname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              value={formik.values.cemail}
              onChange={formik.handleChange}
              error={formik.touched.cemail && Boolean(formik.errors.cemail)}
              helperText={formik.touched.cemail && formik.errors.cemail}
              fullWidth
              name="cemail"
              label="Your Email"
              type="email"
              id="cemail"
            />
            <TextField
              margin="normal"
              required
              value={formik.values.cmessage}
              onChange={formik.handleChange}
              error={formik.touched.cmessage && Boolean(formik.errors.cmessage)}
              helperText={formik.touched.cmessage && formik.errors.cmessage}
              fullWidth
              multiline
              rows={3}
              name="cmessage"
              label="Message"
              type="text"
              id="cmessage"
            />
            <Button variant="contained" type="submit" color="success"  sx={{backgroundColor:'black'}}>
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
