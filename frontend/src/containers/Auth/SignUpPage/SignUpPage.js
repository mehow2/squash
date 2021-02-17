import React, { useState } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles, 
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const isEmailValid = (val) => {
    if (!email) return false;
    const rep = new RegExp(/\w+@\w{2,}\.\w{2,}/);
    return rep.test(val);
  }

  const [usernameField, setUsernameField] = useState({ value: '', touched: false });
  const [emailField, setEmailField] = useState({ value: '', touched: false });
  const [passwordField, setPasswordField] = useState({ value: '', touched: false });
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const onUsernameChanged = (e) => {
    setUsernameField({
      touched: true,
      value: e.target.value,
      isValid: !!e.target.value,
    });
  };

  const onEmailChanged = (e) => {
    setEmailField({
      touched: true,
      value: e.target.value,
      isValid: isEmailValid(e.target.value)
    });
  };

  const isPasswordValid = val => {
    if (!val) return false;
    if (val.length < 8) return false;
    let re = /\W/;
    return re.test(val);
  };

  const onPasswordChanged = (e) => {
    setPasswordField({
      touched: true,
      value: e.target.value,
      isValid: isPasswordValid(e.target.value),
    });
  };

  const isPasswordConfirmed = (val) => {
    return val === passwordField.value;
  };

  const onConfirmPasswordChanged = (e) => {
    setConfirmedPassword({
      touched: true,
      value: e.target.value,
      isValid: isPasswordConfirmed(e.target.value)
    });
  }

  const onSignIn = (e) => {
    e.preventDefault();
    const formData = {
      username: usernameField.value,
      email: emailField.value,
      password: passwordField.value,
    }
    axios.post('auth/register/', formData)
      .then(() => {
        const loginForm = {
          username: usernameField.value,
          password: passwordField.value,
        };
        axios.post('auth/login/', loginForm)
          .then(() => props.history.push('/'));
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={ classes.form } noValidate>
          <TextField
            error={ usernameField.touched && !usernameField.isValid }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={ onUsernameChanged }
          />
          <TextField
            error={ emailField.touched && !emailField.isValid }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={ onEmailChanged }
          />
          <TextField
            error={ passwordField.touched && !passwordField.isValid }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={ onPasswordChanged }
          />
          <TextField
            error={ confirmedPassword.touched && !confirmedPassword.isValid }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            onChange={ onConfirmPasswordChanged }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ onSignIn }
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">
                If you have an account. Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={ 8 }>
      </Box>
    </Container>
  );
}
