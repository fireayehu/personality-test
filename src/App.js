import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import RecentPage from "./pages/recent";
import QuestionPage from "./pages/question";
import TestPage from "./pages/test";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Header from "./components/header";
import BottomNavigation from "./components/bottom-nav";
import GuardedRoute from "./components/guarded-route";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 0,
    paddingRight: 0,
  },
  mainContainer: {
    flex: 1,
    marginBottom: 100,
  },
}));

const App = () => {
  const classes = useStyles();
  const { token } = useSelector((state) => state.auth);
  return (
    <Container maxWidth="xs" className={classes.container}>
      {token ? <Header /> : null}
      <div className={classes.mainContainer}>
        <Switch>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <GuardedRoute exact path="/">
            <QuestionPage />
          </GuardedRoute>
          <GuardedRoute exact path="/recent">
            <RecentPage />
          </GuardedRoute>
          <GuardedRoute exact path="/questions">
            <QuestionPage />
          </GuardedRoute>
          <GuardedRoute exact path="/questions/:id/test">
            <TestPage />
          </GuardedRoute>
        </Switch>
      </div>
      {token ? <BottomNavigation /> : null}
    </Container>
  );
};

export default App;
