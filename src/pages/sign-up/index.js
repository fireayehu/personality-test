import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ReactComponent as Reading } from "../../assets/reading.svg";
import { signUpStart } from "../../store/auth/reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    padding: 20,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  formItem: {
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    textAlign: "right",
    marginTop: 10,
  },
}));

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#000",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "50px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  },
})(TextField);

const CustomButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
}))(Button);

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const { token, signUpLoading, signUpError } = useSelector(
    (state) => state.auth
  );
  const reg = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  useEffect(() => {
    if (token) {
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [token]);
  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
    if (reg.test(event.target.value)) {
      setError("");
    } else {
      setError("Incorrent phone number format");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (reg.test(phoneNumber)) {
      dispatch(signUpStart({ phoneNumber }));
    } else {
      setError("Incorrent phone number format");
    }
  };
  return (
    <main className={classes.root}>
      <div className={classes.loginContainer}>
        <Reading className={classes.image} />
        <Typography variant="h5" className={classes.title}>
          ጥያቄዎችን ለመመለስ ይመዝገቡ
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={classes.formContainer}
          onSubmit={handleSubmit}
        >
          <CustomTextField
            error={error || signUpError ? true : false}
            label="Phone number"
            type="Phone number"
            variant="outlined"
            size="small"
            value={phoneNumber}
            onChange={handleChange}
            className={classes.formItem}
            helperText={
              error
                ? error
                : signUpError && signUpError.response
                ? signUpError.response.data.message
                : ""
            }
          />
          <CustomButton
            variant="contained"
            className={classes.formItem}
            type="submit"
            disabled={signUpLoading}
          >
            {signUpLoading && (
              <CircularProgress size={15} style={{ marginRight: 5 }} />
            )}
            Sign Up
          </CustomButton>
          <Typography variant="caption" className={classes.footer}>
            Already have account? <Link to="/sign-in">Signin</Link>
          </Typography>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
