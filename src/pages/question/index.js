import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as LightBulb } from "../../assets/lightbulb.svg";
import { questions } from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    padding: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
  },
  button: {
    width: 200,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
}));

const Question = () => {
  const classes = useStyles();
  const history = useHistory();

  const question = questions[0];

  const handleClick = () => {
    history.push(`/questions/${question.id}/test`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          {question.title}
        </Typography>
        <Typography
          component="p"
          color="textSecondary"
          className={classes.description}
        >
          {question.description}
        </Typography>
      </div>
      <LightBulb className={classes.image} />
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleClick}
      >
        Play Now
      </Button>
    </div>
  );
};

export default Question;
