import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const NotLoggedIn = ({ loggedIn, path, exact, component: Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        if (loggedIn) {
          return <Redirect to="/groups" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.user.id,
});

export default connect(
  mapStateToProps,
  null
)(NotLoggedIn);
