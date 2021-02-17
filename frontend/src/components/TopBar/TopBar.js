import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
  makeStyles
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getUserInfo, logoutUser } from '../../store/actions/authentication';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logoutButton: {
    margin: '10px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
}))

const TopBar = props => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const onLogoutClick = () => dispatch(logoutUser(props.history.push));

  let userInfo = <Button>
    <Link to='/login'>Login</Link>
  </Button>

  const toggleMenuOpen = () => {
    setMenuOpen(prevOpen => !prevOpen);
  }

  const handleMenuClose = () => {
    setMenuOpen(false);
  }

  if (isAuthenticated) {
    userInfo = (
      <div>
        <IconButton
          onClick={ toggleMenuOpen }
          ref={ anchorRef }
        >
          <Person />
        </IconButton>
        <span>{ `Hello, ${user.username}` }</span>

        <Popper open={ menuOpen } anchorEl={ anchorRef.current } role={ undefined } transition disablePortal>
          { ({ TransitionProps, placement }) => (
            <Grow
              { ...TransitionProps }
              style={ { transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' } }
            >
              <Paper>
                <ClickAwayListener onClickAway={ handleMenuClose }>
                  <MenuList autoFocusItem={ menuOpen } id="menu-list-grow">
                    <MenuItem>
                      <Link to='/profile' className={classes.link}>
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={ onLogoutClick }>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          ) }
        </Popper>
      </div>
    );
  }

  return (
    <AppBar position="fixed" className={ props.className }>
      <Toolbar>
        <Typography variant="h6" className={ classes.root }>
          <Link to='/leagues' className={ classes.link }>
            Squash League
             </Link>
        </Typography>
        <Typography variant='h6'>
          { userInfo }
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default TopBar;
