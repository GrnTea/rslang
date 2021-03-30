import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signOut } from "../../../redux/user_reducer";
import { RootState } from "../../../redux/reducer";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserProfile = ({ user, signOut }) => {
  const history = useHistory();
  const classes = useStyles();
  return user.email ? <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        {user.email[0].toUpperCase()}
      </Avatar>
      <Typography component="h1" variant="h5">
        {/(.*)@/.exec(user.email)[1]}
      </Typography>
    </div>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={() => {
        signOut(user);
        history.push("/");
      }}
    >
      Sign Out
    </Button>
  </Container> : null;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
