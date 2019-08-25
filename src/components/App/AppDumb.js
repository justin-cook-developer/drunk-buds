import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoggedIn from '../Routers/LoggedIn';
import NotLoggedIn from '../Routers/NotLoggedIn';
import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Groups = () => <div className='has-text-centered'>Groups</div>;

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
            <LoggedIn path="/groups" exact component={Groups} />
            <NotLoggedIn path="/login" exact component={Login} />
            <NotLoggedIn path="/signup" exact component={Signup} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
