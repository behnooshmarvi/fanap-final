import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";

import AuthService from "services/auth.service";
import User from "components/User";
import Categories from "components/Categories";
import CostTable from "components/CostTable";
import { JalaaliCalendar } from "components/Calendar/JalaaliCalendar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "25px",
    marginTop: "15px",

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.secondary,
    position: "relative",
    height: "316px",
    overflowY: "scroll",

  },
}));

export default function CostContainer() {
  const [selectedUserId, setSelectedUserId] = React.useState(-1);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(-1);
  const [selectedTimestamp, setSelectedTimestamp] = React.useState("");

  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#f5f5f5", direction: "ltr" }}>
        <Toolbar>
          <button
            onClick={() => {
              AuthService.logOut();
              history.replace("/");
            }}
          >
            <PowerSettingsNewIcon />
          </button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <User
                className={classes.paper}
                setSelectedUserId={setSelectedUserId}
              />
            </Grid>
            <Grid item xs={3}>
              <Categories
                className={classes.paper}
                setSelectedCategoryId={setSelectedCategoryId}
              />
            </Grid>
            <Grid item xs={3}>
              <JalaaliCalendar
                className={classes.paper}
                setSelectedTimestamp={setSelectedTimestamp}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid item xs={12}>
            <CostTable
              className={classes.paper}
              selectedUserId={selectedUserId}
              selectedCategoryId={selectedCategoryId}
              selectedTimestamp={selectedTimestamp}
            />
          </Grid>
        </div>
      </div>
    </>
  );
}
