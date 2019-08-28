/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import axios from '../../axios';
import HalfPage from '../HalfPage/HalfPage';
import Map from '../Map/MapDumb';

class AddUser extends Component {
  state = {
    values: { username: '' },
    errors: { username: '' },
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        '/api/users/username/' + this.state.values.username
      );

      if (data.errors) {
        this.setState(state => ({ ...state, errors: data.errors }));
      } else {
        this.props.handleSubmit(data);
        this.props.handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              name="username"
              className="input"
              type="text"
              placeholder="Add by username"
              value={this.state.values.username}
              onChange={this.handleChange}
            />
          </p>

          <p className="control">
            <button type="submit" className="button is-primary">
              Add User
            </button>
          </p>
          <p className="control">
            <button
              type="button"
              className="button"
              onClick={this.props.handleCancel}
            >
              Cancel
            </button>
          </p>
        </div>
        {this.state.errors.username && this.state.errors.username.length && (
          <div className="field">
            <p className="help is-danger">{this.state.errors.username}</p>
          </div>
        )}
      </form>
    );
  }
}

class Group extends Component {
  state = {
    showForm: false,
  };

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.removeGroup();
  }

  toggleShowForm = () =>
    this.setState(({ showForm }) => ({ showForm: !showForm }));

  render() {
    const group = this.props.group;

    if (!group.name) {
      return (
        <section className="section">
          <div className="content has-text-centered">Loading...</div>
        </section>
      );
    }

    const date = new Date(group.startTime);

    return (
      <Fragment>
        <section className="section">
          <div className="content">
            <h1 className="subtitle has-text-centered">
              {group.name} @ {group.location}
            </h1>
          </div>
          <p className="content has-text-centered">
            Date: {date.getMonth() + 1} / {date.getDate()} /{' '}
            {date.getFullYear()}
          </p>
          <p className="content has-text-centered">Agenda: {group.agenda}</p>
        </section>

        <section className="section">
          <p className="content has-text-centered">Attendees</p>
          {!this.state.showForm && (
            <p className="content has-text-centered">
              <button
                type="button"
                className="button is-primary"
                onClick={this.toggleShowForm}
              >
                Add a friend to this group!
              </button>
            </p>
          )}
          {this.state.showForm && (
            <HalfPage>
              <AddUser
                handleCancel={this.toggleShowForm}
                handleSubmit={user => this.props.addUserToGroup(user)}
              />
            </HalfPage>
          )}
          <ul className="list">
            {group.users.map(({ id, username, firstName, lastName }) => (
              <li className="list-item has-text-centered" key={id}>
                {username} : {firstName} {lastName}
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <Map locations={this.props.locations} />
        </section>
      </Fragment>
    );
  }
}

export default Group;
