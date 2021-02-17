import React from 'react';
import Main from './containers/Main/Main';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import LogIn from './containers/Auth/LoginPage/LoginPage';
import SignUp from './containers/Auth/SignUpPage/SignUpPage';
import { createBrowserHistory } from 'history';
import { setupInterceptors } from './axios';

const browserHistory = createBrowserHistory();
setupInterceptors(browserHistory);

function App() {
  return (
    <Router history={ browserHistory }>
      <Switch>
        <Route path='/login' component={ LogIn } />
        <Route path='/signup' component={ SignUp } />
        <Route path='/' component={ Main } />
      </Switch>
    </Router >
  );
}

export default App;
