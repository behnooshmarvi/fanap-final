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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({ userName: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((st) => ({ ...st, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("\n\n--------- handleSubmit --------");
    e.preventDefault();
    setLoading(true);
    const { userName, password } = state;
    console.log(JSON.parse(localStorage.getItem("user")));
    AuthService.login(userName, password)
      .then((response) => {
        console.log("response = ", response);
        history.replace("/cost");
      })
      .catch((error) => {
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            s
            label="نام کاربری"
            name="userName"
            autoComplete="نام کاربری"
            autoFocus
            value={state.userName}
            onChange={handleChange}
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
            autoComplete="'گذر واژه"
            value={state.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
            onClick={handleSubmit}
          >
            ورود
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"ثبت نام"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
