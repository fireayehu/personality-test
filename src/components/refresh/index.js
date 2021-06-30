import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginBottom: 10,
  },
  button: {
    width: 150,
  },
}));

const Refresh = ({ message = "", onClick = () => {} }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.message}
      >
        {message}
      </Typography>
      <Button variant="outlined" className={classes.button} onClick={onClick}>
        Refresh
      </Button>
    </div>
  );
};

export default Refresh;
