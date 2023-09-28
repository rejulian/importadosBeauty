import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Logo from '../../images/logo.jpeg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { menuItems } from "../../Router/navigation";
import { onLogOut } from "../../firebaseConfig";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext";
const drawerWidth = 200;

function Navbar(props) {
  const navigate = useNavigate()
  const { logoutContext, user, isLogged } = useContext(AuthContext)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogOut = () => {
    onLogOut();
    logoutContext()
    navigate('/login')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <Link key={id} to={path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}

        {
          user.role === import.meta.env.VITE_ADMIN_CODE &&
          <Link to={'/dashboard'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} sx={{ color: "black" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        }

        {isLogged ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Cerrar sesion"}
                sx={{ color: "black" }}
              />
            </ListItemButton>
          </ListItem>

        ) : (
          <>
            <Link to='login'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Iniciar sesion"}
                    sx={{ color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={'/register'}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HowToRegIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Registrate"}
                    sx={{ color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )
        }
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar
          sx={{ gap: "20px", display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between", alignItems: "center", height: "100px" }}
        >
          <div></div>
          <Link to="/" style={{ color: "black" }}>
            <img className="logo" src={Logo} alt="Importados Beauty" />
          </Link>
          <IconButton
            color="secondary.primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon color="secondary.primary" />

          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor={"left"}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          width: "100%",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
