import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";
import RestoreIcon from "@material-ui/icons/Restore";
import HomeIcon from "@material-ui/icons/Home";
import "./style.css";

const useStyles = makeStyles({});

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState("/");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/recent") {
      setValue(location.pathname);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    history.push(newValue);
  };

  return (
    <Paper elevation={5}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction label="ጥያቄ" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="ማህደር"
          value="/recent"
          icon={<RestoreIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
