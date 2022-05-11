import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// mui setup for the NavBar
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// Need to implement a GET for user friends in the backend, that or remove the Friends page
// Could use GET specific user and from there on populate the friend_list arr and parse accordingly
const NavBar = ({user, setUser}) => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setUser('');
        handleClose();
        setDrawerOpen(false);
        navigate('/login');
    }

    const handleLogoClick = () => {
        if (user) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    const handleFriendListClick = () => {
      navigate('/friends');
    }

    const handleProfileClick = () => {
        navigate(`/users/${user.id}`);
        handleClose();
    }

    return(
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {user? (
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key='Home' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleLogoClick}>Home</Typography>
                </MenuItem>
                <MenuItem key='Friends' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleFriendListClick}>Friends</Typography>
                </MenuItem>
              </Menu>
              ) : null}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              onClick={handleLogoClick}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            
            {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Your profile picture' src='to-update-with-user-pfp-path' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key='Profile' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleProfileClick}>Profile</Typography>
                </MenuItem>
                <MenuItem key='Logout' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            ) : null}
            
          </Toolbar>
        </Container>
      </AppBar>
    )
};

export default NavBar;