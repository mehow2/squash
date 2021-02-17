import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeagueTable from '../../components/LeagueList/LeagueTable';
import { Toolbar } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import NewLeagueDialog from '../../components/NewLeagueDialog/NewLeagueDialog';
import TopBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';
import { Snackbar } from '@material-ui/core';
import Profile from '../../components/Profile/Profile';
import LeagueDetails from '../../components/LeagueDetails/LeagueDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer({history}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  const onDialogClose = () => {
    setModalOpen(false);
  }

  const onDialogOpen = () => {
    setModalOpen(true);
  }

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <TopBar className={ classes.appBar } history={history} />
      <SideBar
        dialogOpened={ onDialogOpen } />
      <main className={ classes.content }>
        <Toolbar />
        <NewLeagueDialog
          onClose={ onDialogClose }
          modalOpen={ modalOpen }
          setSnackbarMsg={ setSnackbarMsg }
          setSnackbarOpen={ setSnackbarOpen }
        />
        <Switch>
          <Route path='/leagues/:name' component={ LeagueDetails } />
          <Route path='/leagues' component={ LeagueTable } />
          <Route path='/profile' component={ Profile } />
        </Switch>
        <Snackbar
          onClose={ () => setSnackbarOpen(false) }
          open={ snackbarOpen }
          message={ snackbarMsg }
          autoHideDuration={ 3000 }
          anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'left',
          } } />
      </main>
    </div>
  );
}