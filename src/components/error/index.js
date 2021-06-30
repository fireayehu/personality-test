import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

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
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: 150,
  },
  alertContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AlertError = ({ message = "", onClick = () => {} }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert icon={false} severity="error" className={classes.alertContainer}>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.message}
        >
          {message}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={onClick}
        >
          Try Again
        </Button>
      </Alert>
    </div>
  );
};

export default AlertError;
