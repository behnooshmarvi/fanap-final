import React from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Button from "components/Button";
import AuthService from "services/auth.service";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    name: "",
    userName: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((st) => ({ ...st, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, userName, password } = state;
    AuthService.register(name, userName, password)
      .then((response) => {
        history.replace("/cost");
      })
      .catch((error) => {
        console.log("error = ", error);
        setLoading(false);
        toast.error(error.message);
      });
    console.log("--------- handleSubmit --------\n\n");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoComplete="نام"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="نام"
            autoFocus
            value={state.name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="نام کاربری"
            name="userName"
            autoComplete="نام کاربری"
            value={state.userName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="گذر واژه"
            type="password"
            id="password"
            autoComplete="گذر واژه"
            value={state.password}
            onChange={(e) => handleChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
            onClick={(e) => handleSubmit(e)}
          >
            ثبت نام
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                ورود
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
