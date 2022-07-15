import React from 'react'
import { Grid } from '@mui/material'
import NotFoundImg from "../../assests/page-found.jpg"


export default function NotFound() {
  return (
    <Grid container>
      <center>
  <Grid item xs={12} sm={12} md={12} lg={12}>

    <img src={NotFoundImg} alt='' style={{height:900,width:1100}}/>
  </Grid>
  </center>
  </Grid>
  )
}
