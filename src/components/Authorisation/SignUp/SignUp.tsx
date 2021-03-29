import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const errorMessages: { [prop: string]: { [prop: string]: string } } = {
    userName: {
      required: "required field",
      wordChars: "use only latin letters, digits and underscore symbol",
      short: "too short",
    },
    email: {
      required: "required field",
      validEmail: "invalid email",
      long: "too long",
    },
    password: {
      required: "required field",
      strong: "should contain at least one lower-case letter, one upper-case letter and a digit",
      short: "too short",
      long: "too long",
    },
  };

  const onSubmit = async (data, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    const rawResponse = await fetch('https://rslernwords.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(rawResponse);
    if (rawResponse.ok) {
      console.log('user successfully added');
      window.location.href = '/'; //to be deleted when Router implemented 
      //history.push('/'); //to be uncommented when Router implemented 
    }
    else {
      console.log('server rejected request');
    }
    //setLoading(false);
    //const content = await rawResponse.json();
    //console.log(content);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!errors?.userName}
                helperText={errors.userName && errorMessages.userName[errors.userName.type]}
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Your Name"
                autoFocus
                inputRef={register({
                  validate: {
                    required: (value) => !!value,
                    wordChars: (value) => /^[\w]*$/.test(value),
                    short: (value) => value.length > 1,
                    long: (value) => value.length < 16,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors?.email}
                helperText={errors.email && errorMessages.email[errors.email.type]}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  validate: {
                    required: (value) => !!value,
                    validEmail: (value) => /^\S+@\S+\.\S+$/.test(value),
                    long: (value) => value.length < 64,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors?.password}
                helperText={errors.password && errorMessages.password[errors.password.type]}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  validate: {
                    required: (value) => !!value,
                    strong: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[\S]*$/.test(value),
                    short: (value) => value.length > 8,
                    long: (value) => value.length < 64,
                  },
                })}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>

        </form>
      </div>

    </Container>
  );
}
