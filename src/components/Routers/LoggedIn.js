import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LoggedIn = ({ loggedIn, path, exact, component: Component }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
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
)(LoggedIn);
