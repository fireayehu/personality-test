import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../components/loader";
import RefreshButton from "../../components/refresh";
import AlertError from "../../components/error";
import { fetchSingleQuestionStart } from "../../store/question/reducer";

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
    width: 250,
    height: 250,
    borderRadius: 10,
  },
}));

const Question = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const {
    singleQuestion: question,
    fetchSingleQuestionLoading: loading,
    fetchSingleQuestionError: error,
  } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(fetchSingleQuestionStart());
  }, []);

  const handleClick = () => {
    history.push(`/questions/${question._id}/test`);
  };
  const handleRefresh = () => {
    dispatch(fetchSingleQuestionStart());
  };
  if (error) {
    return (
      <AlertError
        message={error.response ? error.response.data.message : error.message}
        onClick={handleRefresh}
      />
    );
  }
  if (loading) {
    return <Loader message="Loading question..." />;
  }
  if (!question) {
    return (
      <RefreshButton
        message="There are no questions yet"
        onClick={handleRefresh}
      />
    );
  }

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
      <img
        src={`${process.env.REACT_APP_IMG_URL}/cover/${question.coverImg}`}
        alt={question.title}
        className={classes.image}
      />
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
