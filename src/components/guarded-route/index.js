import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardedRoute = ({ children, ...rest }) => {
  const { token } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default GuardedRoute;
