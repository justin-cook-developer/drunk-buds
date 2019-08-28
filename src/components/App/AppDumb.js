import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import socket from '../../socket';
import LoggedIn from '../Routers/LoggedIn';
import NotLoggedIn from '../Routers/NotLoggedIn';
import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ProfilePage from '../ProfilePage/profilePage';
import Groups from '../Groups/Groups';
import Group from '../SingleGroup/Group';

class App extends Component {
  state = {
    locatorId: null,
  };

  componentDidMount() {
    this.props.getMe();

    const locatorId = navigator.geolocation.watchPosition(
      position =>
        socket.emit(
          'location',
          position.coords.longitude,
          position.coords.latitude
        ),
      error => console.error(error),
      { enableHighAccuracy: true }
    );
    socket.on('userLocation', this.props.gotLocation);

    this.setState({ locatorId });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.locatorId);
  }

  render() {
    if (this.props.gettingMe) {
      return null;
    } else {
      return (
        <Fragment>
          <header>
            <Nav />
          </header>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <LoggedIn path="/groups" exact component={Groups} />
              <LoggedIn path="/groups/:id" exact component={Group} />
              <LoggedIn path="/profile" exact={false} component={ProfilePage} />
              <NotLoggedIn path="/login" exact component={Login} />
              <NotLoggedIn path="/signup" exact component={Signup} />
            </Switch>
          </main>
        </Fragment>
      );
    }
  }
}

export default App;
