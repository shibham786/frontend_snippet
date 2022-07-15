import  React,{useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserDetail } from "../../store/slices/loginSlice";
import logo from "../../assests/logo.png";
import DrawerLayout from "./Drawer";
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./header.module.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const pages = [{title:"❤ Your Interest", path: "TrendingRepo"},{title:"📝Create Snippet", path: "NewRepository"},{title:"📜Your Snippets",path:"UserRepository"}, {title:"☎ Contact Us",path:"Contact"}];

const theme = createTheme({
  typography: {
      fontFamily: 'sans-serif',
     
  }

});


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state)=> state?.login?.userDetail)
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const usertoken = localStorage.getItem("user")

  const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      dispatch(GetUserDetail());
    }, []);

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <ThemeProvider theme={theme}>
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "black", minWidth: "400px" }}
    >
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src={logo}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CodeSnippet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          
            <DrawerLayout  onClose={handleDrawerClose} open={open}/>
          </Box>
          <Avatar
            src={logo}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CodeSnippet
          </Typography>
            {usertoken &&
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

                {pages.map((page) => (
                  <Button
                  className={styles.link}
                    key={page}
                    onClick={() => {
                      navigate(`/${page.path}`);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.title}
                  </Button>
                ))}

              </Box>
              }
          

          <Box sx={{ flexGrow: 0 ,display:'flex'}}>
            {localStorage.getItem("user") && (
              <div>
              <Typography variant="body" m={2}>{userDetail?.email}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src={`http://localhost:8000/${userDetail?.profile_pic}`} />
                </IconButton>
              </Tooltip>
              </div>
            )}
            {!localStorage.getItem("user") && (
              <>
               <Button
              
              sx={{ color: "white" ,display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              🏡Home
            </Button>
              <Button
              
                sx={{ color: "white" ,display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
               🔐 Login
              </Button>
              
             </>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleCloseUserMenu}>
                <Button
                startIcon={<PersonPinIcon/>}
                  textAlign="center"
                  onClick={() => {
                 
                    navigate("/EditProfile");
                  }}
                >
                  Update Profile
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} >
                <Button
                  startIcon={<KeyIcon/>}
                  textAlign="center"
                  onClick={() => {
                 
                    navigate("/ChangePassword");
                  }}
                >
                  Change Password
                </Button>
              </MenuItem>
              <MenuItem onClick={() => {
                    localStorage.removeItem("user");
                    handleCloseUserMenu()
                    navigate("/");
                  }}>
                <Button
                  startIcon={<LogoutIcon/>}
                  textAlign="center"
                >
                  logout
                </Button>
              </MenuItem>
             
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};
export default Header;
