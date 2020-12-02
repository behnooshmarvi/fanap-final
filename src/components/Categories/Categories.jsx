import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import axios from 'axios';



function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: true, disablePadding: false, label: 'نام' },
  { id: 'operation', numeric: true, disablePadding: false, label: '' },

];

function EnhancedTableHead(props) {

  return (
    <TableHead stickyHeader aria-label="sticky table">
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
           
          >
              {headCell.label}
          
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: '0 3px 15px rgba(0,0,0,.2)',
  },
  
  icon: {
      color: '#f50057',
       fontSize: '18px', 
      
    
  
  },
}));

export default function EnhancedTableWithRadio() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('');
  const [rows, setRows] = useState([]);


  useEffect(() => {
    axios.get("/api/categories")
      .then(function(response) {
        setRows(response.data);
      }).catch(function(error) {
        console.log(error);
      })
  }, []);

 

  const handleClick = (event, name) => {
    let newSelected = selected;

    if (name !== selected) {
      newSelected = name;
    } else  {
      newSelected = "";
    }
    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;
 const toolbarClasses = useToolbarStyles();
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Toolbar
      className={clsx(toolbarClasses.root)}
    >
      { (
        <Typography className={toolbarClasses.title} variant="h6" id="tableTitle" component="div">
            دسته بندي ها
        </Typography>
      )}
    </Toolbar>

        <TableContainer style={{position:"relative",height:"265px"}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size = "small"
            aria-label="enhanced table"
         
          >
            <EnhancedTableHead
              classes={classes}
            />
            <TableBody>
              {stableSort(rows)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">
                      <DeleteForeverIcon className={classes.icon} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}