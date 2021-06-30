import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
    marginTop: 10,
  },
}));
const Loader = ({ message = "" }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={30} />
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.message}
      >
        {message}
      </Typography>
    </div>
  );
};

export default Loader;
