import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { logOut } from "../../store/auth/reducer";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
const Header = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = () => {
    setAnchorEl(null);
    dispatch(logOut());
  };
  return (
    <div className={classes.headerContainer}>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SettingsIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMenuItemClick}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
