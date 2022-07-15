import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlanguages } from "../../store/slices/languageSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AddRepo, reset } from "../../store/slices/RepoSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import detectLang from "lang-detector";
import computerScience from "../../assests/computer-science.gif"
import {
  Box,
  Typography,
  Divider,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  InputLabel,
  Container,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewRepository() {
  const dispatch = useDispatch();
  // const [ckval, Setckval] = useState("");
  const message = useSelector((state) => state.repo.message);
  const IsSuccess = useSelector((state) => state.repo.IsSuccess);
  const languages = useSelector((state) => state.lang.languages);

  const [open, setOpen] = React.useState(false);
  const { iat, exp, user_id, ...rest } = jwtDecode(
    JSON.parse(localStorage.getItem("user")).access
  );
  //  console.log("expiry token",new Date() > new Date(exp * 1000))
  //  console.log(user_id)

  useEffect(() => {
    dispatch(getlanguages());
  }, []);

  const closeSnackbar = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Required"),
    desc: yup.string().required("Required"),
    lang: yup.string().required("Required"),
    code: yup.string().required("Required")
      .test(
        "compare two values",
        "code language must be same the language you selected",
        function (value) {
          if (value === undefined) return false
          let langtype = this.parent.lang;
          console.log("langtype : ", langtype);
          let codelang = detectLang(value);
           console.log("codelang",codelang);
          if (
            String(
              languages.find((_lang) => _lang?.lang_id === langtype)?.lang_name
            ).toLowerCase() === String(codelang).toLowerCase()
          ) {
            return true;
          } else {
            return false;
          }
        }
      ),
  });

  const initialValues = {
    title: "",
    desc: "",
    code: "",
    permission: "public",
    user: user_id,
    lang: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,

    onSubmit: (values, { resetForm }) => {
      // values.code = ckval;

      dispatch(AddRepo(values));

      setOpen(true);
      dispatch(reset());
      resetForm();
      // values.code = ckval;
    },
  });

  console.log(initialValues);

  // const ckHandler = (e, editor) => {
  //   const data = editor.getData();
  //   Setckval(data);
  //   console.log(data);
  // };

  return (
    <Grid container>
       <Grid item  md={6} mt={2} sx={{ display:'flex',alignItems:'center',justifyContent:'center',alignSelf:'center' }}>
        <Container
          style={{
            display: { md: "block", sm: "none", sx: "none" },
            justifyContent: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <img src={computerScience} alt="" height="600px" width="100%" />
        </Container>
      </Grid>
      <Grid item sm={12} xs={12} md={6}>
    <Container maxWidth="sm">
      <Box
        sx={{
          py: 3,
          px: 2,
          minWidth: "460px",
          mt: "auto",
        }}
      >
        <Typography sx={{ mt: 1 }} variant="h6" component="h4">
          Create a new Snippet
        </Typography>

        <Divider />
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          sx={{ width: "450px", mt: 3 }}
        >
          <TextField
            fullWidth
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            label="Snippet Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={formik.values.desc}
            name="desc"
            onChange={formik.handleChange}
            error={formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
            id="desc"
            label="Snippet Desc"
            sx={{ mt: 2 }}
            variant="outlined"
          />

          <FormControl sx={{ mt: 2 }}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ color: "black" }}
            >
              Permission
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="public"
              onChange={formik.handleChange}
              error={
                formik.touched.permission && Boolean(formik.errors.permission)
              }
              helperText={formik.touched.permission && formik.errors.permission}
              name="permission"
              id="permission"
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-labell">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="lang"
              name="lang"
              label="Language"
              variant="outlined"
              value={formik.values.lang}
              onChange={formik.handleChange}
              error={formik.touched.lang && Boolean(formik.errors.lang)}
              helperText={formik.touched.lang && formik.errors.lang}
            >
              {languages?.map((l, index) => {
                return (
                  <MenuItem key={index} value={String(l.lang_id)}>
                    {l.lang_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            {/* <CKEditor
              required
              editor={ClassicEditor}
              name="code"
              id="code"
              data={formik.values.code}
              onChange={ckHandler}
            /> */}
            <TextField
              fullWidth
              multiline
              rows={8}
              value={formik.values.code}
              name="code"
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              id="code"
              label="Repository Code"
              sx={{ mt: 2 }}
              variant="outlined"
            />
          </Box>
          <Button
            type="submit"
            sx={{ mt: 2 }}
            variant="contained"
            color="success"
          >
            Create Repository
          </Button>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert
          onClose={closeSnackbar}
          severity={IsSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
    </Grid>
    </Grid>
  );
}
