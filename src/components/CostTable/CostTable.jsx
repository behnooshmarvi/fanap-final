import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import momentJalaali from "moment-jalaali";

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "شناسه" },
  { id: "title", numeric: true, disablePadding: false, label: "عنوان" },
  { id: "date", numeric: true, disablePadding: false, label: "تاریخ" },
  { id: "amount", numeric: true, disablePadding: false, label: "مقدار" },
  { id: "category", numeric: false, disablePadding: false, label: "دسته" },
  { id: "operation", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow: "0 3px 15px rgba(0,0,0,.2)",
    paddingBottom: "50px",
  },
  table: {
    // minWidth: 750,
  },

  icon: {
    color: "#f50057",
    fontSize: "18px",
  },
}));

export default function EnhancedTableWithRadio(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(-1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.selectedTimestamp) {
      console.log("\n\n=== === === === === === === === ===");
      console.log("selectedTimestamp = ", props.selectedTimestamp);
      console.log(
        "typeof selectedTimestamp = ",
        typeof props.selectedTimestamp
      );
      axios
        .get(
          `/api/entries/${momentJalaali(
            props.selectedTimestamp,
            "jYYYY/jMM/jDD"
          ).valueOf()}`
        )
        .then((response) => {
          console.log(response.data);
          console.log(typeof response.data);
          setRows(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("=== === === === === === === === ===\n\n");
    }

    if (props.selectedCategoryId !== -1) {
      axios
        .get(`/api/categories/${props.selectedCategoryId}/entries`)
        .then(function (response) {
          console.log("\n\n --- selectedCategory Entries ---");
          console.log("selectedCategoryId = ", props.selectedCategoryId);
          console.log("length = ", response.data.length);
          console.log("response.data = ", response.data);
          console.log("--- selectedCategory Entries --- \n\n");
          if (!props.selectedTimestamp) {
            setRows(response.data);
          } else {
            let mutualRows = [];
            response.data.map((entry) => {
              if (
                props.selectedTimestamp ===
                momentJalaali(entry.date).locale("fa").format("jYYYY/jM/jD")
              ) {
                mutualRows.push(entry);
              }
            });
            setRows(mutualRows);
          }
          console.log("--- selectedCategory Entries ---\n\n");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (props.selectedUserId !== -1) {
      axios
        .get("/api/users")
        .then(function (response) {
          console.log("\n\n --- selectedUser Entries ---");
          console.log("selectedUserId = ", props.selectedUserId);
          console.log("length = ", response.data.length);
          response.data.map((user) => {
            if (user.id === props.selectedUserId) {
              console.log("user.id = ", user.id);
              console.log("props.selectedUserId = ", props.selectedUserId);
              console.log("user.entries = ", user.entries);
              if (props.selectedCategoryId === -1) {
                if (!props.selectedTimestamp) {
                  setRows(user.entries);
                } else {
                  let mutualRows = [];
                  user.entries.map((entry) => {
                    if (momentJalaali(entry.date).locale("fa").format("jYYYY/jM/jD") === props.selectedTimestamp) {
                      mutualRows.push(entry);
                    }
                  });
                  setRows(mutualRows);
                }
              } else {
                let mutualRows = [];
                user.entries.map((entry) => {
                  if (entry.category.id === props.selectedCategoryId) {
                    mutualRows.push(entry);
                  }
                });
                if (!props.selectedTimestamp) {
                  setRows(mutualRows);
                } else {
                  let finalizedMutualRows = [];
                  mutualRows.map((entry) => {
                    if (momentJalaali(entry.date).locale("fa").format("jYYYY/jM/jD") === props.selectedTimestamp) {
                      finalizedMutualRows.push(entry);
                    }
                  });
                  setRows(finalizedMutualRows);
                }
              }
            }
          });
          console.log("--- selectedUser Entries --- \n\n");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (
      props.selectedUserId === -1 &&
      props.selectedCategoryId === -1 &&
      !props.selectedTimestamp
    ) {
      axios
        .get("/api/entries")
        .then(function (response) {
          setRows(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [props.selectedUserId, props.selectedCategoryId, props.selectedTimestamp]);


  function deleteSubmit(id) {
    fetch(`/api/entries/${id}`, { method: "DELETE" });
    setRows((rows) =>
      rows.filter((row) => row.id !== id)
    );
  }

  const handleClick = (index) => {
    console.log("\n\n--------- CostTable handleClick --------");
    let newSelectedIndex = index;
    console.log("rows[index] = ", rows[index]);
    if (index !== selected) {
      newSelectedIndex = index;
    } else {
      newSelectedIndex = -1;
    }
    setSelected(newSelectedIndex);
    console.log("newSelectedIndex = ", newSelectedIndex);
    console.log("--------- CostTable handleClick --------\n\n");
  };

  const isSelected = (index) => selected === index;
  const toolbarClasses = useToolbarStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={clsx(toolbarClasses.root)}>
          {
            <Typography
              className={toolbarClasses.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              هزینه‌ها
            </Typography>
          }
        </Toolbar>

        <TableContainer style={{ position: "relative", height: "316px" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} />
            <TableBody>
              {stableSort(rows).map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(index)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    style={{ padding: "10px" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="right"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      {momentJalaali(row.date)
                        .locale("fa")
                        .format("jYYYY/jM/jD")}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.category.name}</TableCell>
                    <TableCell align="right">
                      <button onClick={() => deleteSubmit(row.id)} >
                        <DeleteForeverIcon className={classes.icon} />
                      </button>
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
