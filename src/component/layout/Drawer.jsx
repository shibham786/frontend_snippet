import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate, NavLink } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";


const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const pages = [{title:"Trending", path: "TrendingRepo"},{title:"Create Snippet", path: "NewRepository"},{title:"Your Snippets",path:"UserRepository"}, {title:"Contact Us",path:"Contact"}];
export default function DrawerLayout(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        sx={{
         
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <DrawerHeader>
          <IconButton onClick={props.onClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {pages.map((page) => (
            <ListItem key={page.title} disablePadding>
              <ListItemButton>
                <ListItemText
                  onClick={() => {
                    navigate(`/${page.path}`);
                  }}
                  onMouseEnter={props.onClose}
                  primary={page.title}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
