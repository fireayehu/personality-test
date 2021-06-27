import React from "react";
import { useHistory } from "react-router-dom";
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
import { grey, green } from "@material-ui/core/colors";
import { ReactComponent as Result } from "../../assets/result.svg";

import { question } from "./data";

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

const getInitialValue = (questions) => {
  const data = {};
  questions.forEach((q) => {
    data[q.id] = "";
  });
  return data;
};

const Test = () => {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(getInitialValue(question.questions));
  const steps = question.questions;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    history.push("/");
  };
  const handleChange = (event) => {
    const id = steps[activeStep].id;
    setValue((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };
  return (
    <div className={classes.container}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((question) => (
          <Step key={question.id}>
            <StepLabel>{}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.container}>
        {activeStep === steps.length ? (
          <div className={classes.resultConatiner}>
            <Typography variant="h6" className={classes.title}>
              Permissive Parenting
            </Typography>
            <Result className={classes.image} />
            <Typography color="textSecondary" className={classes.description}>
              Permissive or Indulgent parents mostly let their children do what
              they want, and offer limited guidance or direction. They are more
              like friends than parents
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
        ) : (
          <div>
            <Typography variant="h6" className={classes.title}>
              {question.title}
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
                value={value[steps[activeStep].id]}
                onChange={handleChange}
              >
                {steps[activeStep].choices.map((choice) => (
                  <FormControlLabel
                    key={choice.id}
                    value={choice.id}
                    control={<CustomRadio />}
                    label={choice.content}
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
