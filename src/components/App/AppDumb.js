import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import Nav from '../Nav/NavDumb';
import Login from '../Login/LoginDumb';

const App = () => {
  return (
    <Fragment>
      <header>
        <Nav />
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </main>
    </Fragment>
  );
};

export default App;
