import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

class App extends Component {
  componentDidMount() {
    this.props.getMe();
  }

  render() {
    return (
      <Fragment>
        <header>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
