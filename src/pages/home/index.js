import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import { questions } from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    padding: 10,
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    cursor: "pointer",
  },
}));
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/questions/${id}`);
  };
  return (
    <main>
      <Typography variant="h6" className={classes.title}>
        የጥያቄ አይነቶች
      </Typography>
      <List className={classes.root}>
        {questions.map((question) => (
          <div
            key={question.id}
            className={classes.listItem}
            onClick={() => handleClick(question.id)}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <QuestionAnswer />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={question.title}
                secondary={
                  <React.Fragment>{question.description}</React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </main>
  );
};

export default Home;
