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
  Checkbox

} from "@mui/material";
import {getlanguages} from "../../store/slices/languageSlice"
import {useDispatch,useSelector} from "react-redux"

export default function LanguageChoicePopup(props) {
  // const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch()
  useEffect(()=>{

    dispatch(getlanguages())

  },[])

  const languages = useSelector((state)=> state.lang.languages)
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        maxWidth="sm"
        open="true"
      
       
      >
        <DialogTitle>Language In Which You Interested</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set which languages public snippet you want to see
          </DialogContentText>
          <Grid container component="form">
          {languages?.map((langs)=>{
           return <Grid item xs={12} sm={6} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value={langs.lang_id} onChange={()=>{props.toggleCheckBoxChecked(langs.lang_id)}} />}
                  label={langs.lang_name}
                />
              </FormGroup>
            </Grid>
            })}
          
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button  onClick={props.onClick}>ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
