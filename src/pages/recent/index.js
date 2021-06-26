import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import RestoreIcon from "@material-ui/icons/Restore";
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
  },
}));
const Recent = () => {
  const classes = useStyles();
  return (
    <main>
      <List className={classes.root}>
        {questions.map((question) => (
          <div key={question.id} className={classes.listItem}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <RestoreIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={question.title}
                secondary={<React.Fragment>{question.result}</React.Fragment>}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </main>
  );
};

export default Recent;
