import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Loader from "../../components/loader";
import AlertError from "../../components/error";
import { grey, green } from "@material-ui/core/colors";
import {
  fetchQuestionStart,
  submitAnswerStart,
} from "../../store/question/reducer";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  title: {
    padding: 10,
    textAlign: "center",
  },
  description: {
    padding: 10,
    textAlign: "center",
  },
  choicesContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
  },
  choiceItem: {
    paddingBottom: 20,
    color: grey[800],
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  button: {
    width: 100,
    marginRight: 5,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  resultConatiner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  resetButton: {
    width: 200,
  },
}));

const CustomRadio = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: green[300],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Test = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    question,
    result,
    submitAnswerLoading: loading,
    submitAnswerError: error,
  } = useSelector((state) => state.question);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState({});
  const steps = question[params.id]?.data?.questions;

  useEffect(() => {
    dispatch(fetchQuestionStart({ id: params.id }));
  }, [params.id]);
  useEffect(() => {
    if (activeStep === steps?.length) {
      dispatch(
        submitAnswerStart({
          id: params.id,
          answers: value,
        })
      );
    }
  }, [activeStep]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const retry = () => {
    dispatch(fetchQuestionStart({ id: params.id }));
  };

  const handleReset = () => {
    history.push("/");
  };
  const handleChange = (event) => {
    const id = steps[activeStep]._id;
    setValue((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };
  if (question[params.id]?.error) {
    return (
      <AlertError
        message={
          question[params.id].error.response
            ? question[params.id].error.response.data.message
            : question[params.id].error.message
        }
        onClick={retry}
      />
    );
  }
  if (question[params.id]?.loading || !question[params.id]) {
    return <Loader message="Loading question..." />;
  }
  return (
    <div className={classes.container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((question) => (
          <Step key={question._id}>
            <StepLabel>{}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.container}>
        {activeStep === steps.length ? (
          loading || !result ? (
            <Loader message="Calculationg result..." />
          ) : (
            <div className={classes.resultConatiner}>
              <Typography variant="h6" className={classes.title}>
                {result.title}
              </Typography>
              <img
                src={`${process.env.REACT_APP_IMG_URL}/result/${result.img}`}
                alt={result.title}
                className={classes.image}
              />
              <Typography color="textSecondary" className={classes.description}>
                {result.description}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleReset}
                className={classes.resetButton}
                size="small"
              >
                Play Again
              </Button>
            </div>
          )
        ) : (
          <div>
            <Typography variant="h6" className={classes.title}>
              {question[params.id].title}
            </Typography>
            <Typography
              component="h6"
              color="textSecondary"
              className={classes.description}
            >
              {steps[activeStep].title}
            </Typography>
            <FormControl
              component="fieldset"
              className={classes.choicesContainer}
            >
              <RadioGroup
                aria-label="choice"
                name="choice"
                value={value[steps[activeStep]._id]}
                onChange={handleChange}
              >
                {steps[activeStep].choices.map((choice) => (
                  <FormControlLabel
                    key={choice._id}
                    value={choice._id}
                    control={<CustomRadio />}
                    label={choice.title}
                    className={classes.choiceItem}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                onClick={handleBack}
                size="small"
                disabled={activeStep === 0}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleNext}
                size="small"
                disabled={!value[steps[activeStep]._id]}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
