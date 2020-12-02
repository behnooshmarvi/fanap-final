import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import User from 'components/User';
import Categories from 'components/Categories';
import { JalaaliCalendar } from 'components/Calendar/JalaaliCalendar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '25px',
    marginTop: '15px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
}));


export default function Cost() {
  const classes = useStyles();

  return (
    <>
    <AppBar position="static"  style={{backgroundColor:'#f5f5f5'}}>
    <Toolbar>
    <button><PowerSettingsNewIcon/></button>
    </Toolbar>
  </AppBar>
    <div className={classes.root}>

       
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <User className={classes.paper}/>
        </Grid>
        <Grid item xs={3}>
          <Categories className={classes.paper}/>
        </Grid>
        <Grid item xs={3}>
          <JalaaliCalendar className={classes.paper} />
        </Grid>
      </Grid>
    </div>
    </>
  )
}
