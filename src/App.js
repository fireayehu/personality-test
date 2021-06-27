import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import RecentPage from "./pages/recent";
import QuestionPage from "./pages/question";
import TestPage from "./pages/test";
import BottomNavigation from "./components/bottom-nav";
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
  return (
    <Container maxWidth="xs" className={classes.container}>
      <div className={classes.mainContainer}>
        <Switch>
          <Route exact path="/">
            <QuestionPage />
          </Route>
          <Route exact path="/recent">
            <RecentPage />
          </Route>
          <Route exact path="/questions">
            <QuestionPage />
          </Route>
          <Route exact path="/questions/:id/test">
            <TestPage />
          </Route>
        </Switch>
      </div>
      <BottomNavigation />
    </Container>
  );
};

export default App;
