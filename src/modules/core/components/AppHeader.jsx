import * as React from 'react';

//import material component
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

//import other
import  store  from '@/redux';
import logo from '@assets/img/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOpen } from '../redux/sidebar';

//import css
import '../assets/css/appHeader.css'
export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    store.dispatch({
      type: 'auth/logout',
    })
    navigate("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawer = () => {
    dispatch(updateOpen(!store.getState().sidebar.isOpen));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="sticky">
       
        <Toolbar>
          <div className="d-flex justify-content-between align-items-center me-3">
            <img src={logo} alt="logo" className='logo' />
            <span>Profit Business</span>
          </div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'Profit Business'}
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                
              >
                <MenuItem onClick={handleClose}>Thông tin</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}