import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { getlanguages } from "../../store/slices/languageSlice";
import { GetUserChoiceLanguges } from "../../store/slices/userLangChoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { UpdateUserChoiceLanguge } from "../../store/slices/userLangChoiceSlice";
export default function EditLanguageChoice(props) {
  // const [open, setOpen] = React.useState(true);
  const languages = useSelector((state) => state.lang.languages);
  const userLangs = useSelector((state) => state?.userlangs?.userlangs);
  const [Ischecked, setChecked] = useState();
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getlanguages());
    dispatch(GetUserChoiceLanguges());
   
  }, []);

  useEffect(()=>{
    setChecked(userLangs?.lang_id)
  },[userLangs])

  const handleModalclick = () => {
    const { iat, exp, user_id, ...rest } = jwtDecode(
      JSON.parse(localStorage.getItem("user"))?.access
    );
    console.log("Modal Clicked");
    dispatch(UpdateUserChoiceLanguge({ user_id: user_id, lang_id: Ischecked }));
    props.setOpen(false)
  };
  console.log("checked array", Ischecked);

  const toggleCheckBoxChecked = (val) => {
     console.log(val);
    if (Ischecked.includes(val)) {
      const updatearray = Ischecked.filter(e=> e !== val);
      console.log("values =======================",updatearray)
      setChecked(updatearray)
   
    } else {
      setChecked([...Ischecked, val]);
    }
  };

 
 
  // console.log("language", languages);

  return (
    <>
      <Dialog maxWidth="sm" open="true">
        <DialogTitle>Language In Which You Interested</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set which languages public snippet you want to see
          </DialogContentText>
          <Grid container component="form">
            {userLangs?.lang_id &&
              
              languages?.map((langs) => (
                <Grid item xs={12} sm={6} md={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={userLangs?.lang_id?.includes(
                            langs?.lang_id
                          )}
                          {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                          value={langs?.lang_id}
                          onChange={() => {
                            toggleCheckBoxChecked(langs?.lang_id);
                          }}
                        />
                      }
                      label={langs.lang_name}
                    />
                  </FormGroup>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalclick}>ok</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
