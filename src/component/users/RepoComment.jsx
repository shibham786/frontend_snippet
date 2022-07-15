import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AddRepoComment,GetRepoComment } from "../../store/slices/RepoCommentSlice";
import jwtDecode from "jwt-decode"
export default function RepoComment(props) {
    const {iat,exp,user_id,...rest} = jwtDecode(JSON.parse(localStorage.getItem('user')).access)
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    comment: yup.string().required("Required"),
  
  });
  const formik = useFormik({
    initialValues: {
    user : '',
    repo_id: props.repo.repo_id,
    comment: ""
     
    
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
        values.user = user_id
        console.log(values);
      dispatch(AddRepoComment(values));
      resetForm();
      dispatch(GetRepoComment(props.repo.repo_id))
      //   setOpen(true);
   
    },
  });

  return (
   
      <Box
        sx={{
          width: "80%",
        margin:'20px',
          display:'flex',
          flexDirection:'column'
        }}
        onSubmit={formik.handleSubmit}
        component="form"
       
        
      >
        <TextField
          type="text"
          id="comment"
          name="comment"
          fullWidth
          label="Comment Here ....."
          
          onChange={formik.handleChange}
        //   required
          value={formik.values.comment}
         error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
          variant="standard"
        />
        <Button size="small" type="submit" style={{marginTop:'10px'}} variant="contained">
          Comment
        </Button>
      </Box>
   
  );
}
