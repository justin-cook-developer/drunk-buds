import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import LoggedIn from '../Routers/LoggedIn';
import UpdateUser from '../UpdateUser/UpdateUser';

const ProfilePage = ({ user }) => {
  const { username, firstName, lastName, email } = user;
  return (
    <Fragment>
      <section className="section">
        <div className="columns">
          <div
            className="column is-3"
            style={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div className="container">
              <figure className="image is-128x128">
                <img src={user.imageURL} />
              </figure>
            </div>
            <div className="container has-text-centered">
              <h1 className="title">{username}</h1>
              <h2 className="subtitle">
                {firstName} {lastName}
              </h2>
              <p className="content">{email}</p>
            </div>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <p className="control">
            <Link className="button" to="/profile/edit">
              Edit User Info
            </Link>
          </p>
          <p className="control">
            <Link className="button" to="/profile/password">
              Change Password
            </Link>
          </p>
        </div>
      </section>
      <section className="section">
        <LoggedIn path="/profile/edit" exact={true} component={UpdateUser} />
      </section>
    </Fragment>
  );
};

export default ProfilePage;
