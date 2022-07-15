import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';

// Grid
import Grid from '@mui/material/Grid';

const theme = createTheme({
    typography: {
        fontFamily: 'sans-serif',
    },
});


export default function Footer() {
  return (
    <>
    <ThemeProvider theme={theme}>
        <Grid container spacing={2} position="unset" sx={{ backgroundColor: '#056ba9', color: '#efefef', bottom:0,paddingTop:'20px',marginTop:'30px'}} maxHeight="500" mt={0} p={2}>
            <Grid item xs={12} md={4}>

                <Typography variant="body1" component="h2">
                    Our Story
                </Typography>
                <Divider color='#ffffff' /><br />
                <Typography variant="body2">
                Snippet is a programming term for a small region of re-usable source code, machine code, or text. Ordinarily, these are formally defined operative units to incorporate into larger programming modules. Snippet management is a feature of some text editors, program source code editors, IDEs, and related software. It allows the user to avoid repetitive typing in the course of routine edit operations.
                </Typography><br />
               
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="body1" component="h2">
                    Address & Contact
                </Typography>
                <Divider color='#ffffff' /><br />
                <Typography variant="body2">
                    45 godadara surat - 786786
                </Typography>
                <Typography variant="body2">
                    City/Town :	Surat
                </Typography>
                <Typography variant="body2">
                    State :	Gujarat
                </Typography>
                <Typography variant="body2">
                    Phone Number : +91 8698563254
                </Typography>
                <Typography variant="body2">
                    Email : snippet@gmail.com
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Typography variant="body1" component="h2">
                    Useful Links
                </Typography>
                <Divider color='#ffffff' /><br />
                <Typography variant="body2">
                    snippet
                </Typography>
                <Typography variant="body2">
                    Trending
                </Typography>
                <Typography variant="body2">
                    Comment
                </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
                <Typography variant="body1" component="h2">
                    Social Media
                </Typography>
                <Divider color='#ffffff' /><br />
                <Typography variant="body2" >
                    <InstagramIcon /> <FacebookIcon /> <YouTubeIcon /> <PinterestIcon />
                </Typography>

            </Grid>
            <Grid item xs={12} md={12} >
                <Typography variant="body2" component="h2" sx={{ textAlign: 'center', fontFamily: 'unset' }}>
                    TERMS OF USE © 2022 | www.codeSnippet.com | ALL RIGHTS RESERVED
                </Typography>
            </Grid>

        </Grid>
    </ThemeProvider>
</>
);
}