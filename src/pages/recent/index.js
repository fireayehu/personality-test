import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import RestoreIcon from "@material-ui/icons/Restore";
import Loader from "../../components/loader";
import RefreshButton from "../../components/refresh";
import AlertError from "../../components/error";
import { fetchResultsStart } from "../../store/result/reducer";

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
  const dispatch = useDispatch();

  const {
    results,
    fetchResultsLoading: loading,
    fetchResultsError: error,
  } = useSelector((state) => state.result);
  useEffect(() => {
    dispatch(fetchResultsStart());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchResultsStart());
  };

  if (error) {
    return (
      <AlertError
        message={error.response ? error.response.data.message : error.message}
        onClick={handleRefresh}
      />
    );
  }

  if (loading || !results) {
    return <Loader message="Loading recent results..." />;
  }
  if (results.length === 0) {
    return (
      <RefreshButton
        message="There are no recent results yet"
        onClick={handleRefresh}
      />
    );
  }
  return (
    <main>
      <List className={classes.root}>
        {results.map((result) => (
          <div key={result._id} className={classes.listItem}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <RestoreIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={result.question.title}
                secondary={
                  <React.Fragment>{result.content.title}</React.Fragment>
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

export default Recent;
