import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { NavLink } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from '@mui/icons-material/Link';
import Favorite from "@mui/icons-material/Favorite";
import {
  Checkbox,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Menu,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from "@mui/icons-material/Share";
import {DeleteRepo} from "../../store/slices/RepoSlice"
import { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function RepoCard(props) {
  // const [repo, setRepo] = useState(repo);
  const {repo} = props
  const [expand, setExpand] = useState(null);
  const dispatch = useDispatch();
  //menu open and close
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [Copied, setCopied] = useState(false);

  const [DialogOpen,SetDialogOpen] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    SetDialogOpen(e.target);
  };

 useEffect(()=>{

 },[DialogOpen])
  const handleDialogClose = () => {
    SetDialogOpen(null);
  };

  const handleRepoDelete = ()=>{
    
    console.log("repoid",repo.repo_id)
    dispatch(DeleteRepo({'repo_id':repo.repo_id}))
    SetDialogOpen(null);
  }
  return (
  
    <Card
     
      sx={{
        position: "relative",
        // maxWidth: { xs: 200, sm: 200, md: 345 },
        maxHeight: { xs: 200, sm: 250, md: 700 },
        margin: { sm: "10px", xs: "20px", md: "8px" },
        backgroundColor: "#51557E",
      }}
    >
      <CardHeader
        sx={{ color: "#ffff", fontSize: { sm: "10px", md: "22px" } }}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon  onClick={handleClick}/>
          </IconButton>
        }
        title={
          <Typography
            display="-ms-inline-grid"
            variant="subtitle1"
            style={{
              color: "#ffff",
              fontSize: { xs: "10px", sm: "10px", md: "20px" },
            }}
          >
            {repo.title}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle2"
            style={{
              color: "#ffff",
              fontSize: { xs: "10px", sm: "12px", md: "20px" },
            }}
          >
            Sept 14, 2016
          </Typography>
        }
      />
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onBackdropClick={()=>{ setAnchorEl(null)}}
       // onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      
      </Menu>
      <Dialog
       disableBackdropClick 
        open={DialogOpen}
        // onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are You Sure Want To Delete 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleRepoDelete} autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
        <NavLink
    to={`/UserRepoDetail/${repo.repo_id}`}
    style={{ textDecoration: "none" }}
  >
     
        <CardMedia
          component="img"
          sx={{
            height: { xs: 90, sm: 150, md: 200 },
            width: { xs: 100, sm: 150, md: 230 },
            paddingBottom: "10px",
          }}
          image={repo.lang_detail["lang_image"]}
          alt="Paella dish"
        />
     </NavLink>
      <Accordion
      
       onMouseEnter={(e) =>
        expand === repo.repo_id
          ? setExpand(null)
          : setExpand(repo.repo_id)
      }
      onMouseLeave={
        (e) => expand === repo.repo_id && setExpand(null)
        // : setExpand(repo.repo_id)
      }
        expanded={expand === repo.repo_id}
        sx={{
          backgroundColor: "rgba(27, 33, 29, 0.5)",
          backdropFilter: "blur(3px)",
          position: "absolute",
          bottom: 0,
        }}
      >
       
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{ color: "#ffff" }}
              onClick={() => setExpand("")}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontWeight: "bold", color: "#ffff" }}>
            Description
          </Typography>
        </AccordionSummary>
       
        <AccordionDetails
          sx={{
            minHeight:
              expand === repo.repo_id
                ? { xs: 200, sm: 250, md: 150 }
                : {},
            maxHeight:
              expand === repo.repo_id
                ? { xs: 200, sm: 250, md: 100 }
                : {},
            minWidth: { xs: 200, sm: 200, md: 250 },
          }}
          style={{
            overflowY: "scroll",
            scrollbarColor: "#1b211d !important",
            scrollbarWidth: "10px",
          }}
        >
          <Typography
            style={{
              fontSize: { sm: "14px", md: "22px" },
              color: "#ffff",
            }}
          >
            {repo.desc}
          </Typography>
        </AccordionDetails>
       
        <CardActions
          disableSpacing
          sx={{ paddingBottom: 0, margin: 0, padding: 0 }}
          style={{ background: "#1b211d" }}
        >
          <IconButton
            aria-label="add to favorites"
            style={{ color: "#ffff", fontSize: "15px", left: 0, right: 0 }}
          >
            <Checkbox
              // onClick={repoLikeHandler}
              icon={<Favorite sx={{ color: "red" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            {props?.repo?.total_likes}
          </IconButton>

          <CopyToClipboard text={`http://localhost:3000/UserRepoDetail/${repo?.repo_id}`} onCopy={()=>{
                   setCopied(true)
                   setTimeout(() => {
                    setCopied(false)
                   }, 2000);
              }}>
              <Tooltip title={Copied ? ' Link Copied':'copy'}>
                <IconButton>
                <LinkIcon style={{ color: "#ffff" }} />
                </IconButton>
              </Tooltip>
              </CopyToClipboard>
          {/* <IconButton aria-label="share">
            <LinkIcon style={{ color: "#ffff" }} />
          </IconButton> */}
        </CardActions>
      </Accordion>
    </Card>
   
  );
}
