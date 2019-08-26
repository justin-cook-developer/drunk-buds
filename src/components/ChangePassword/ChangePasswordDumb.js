import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HalfPage from '../HalfPage/HalfPage';
import axios from '../../axios';
import FormButtons from '../FormButtons/FormButtons';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        password: '',
        newPassword: '',
      },
      errors: {},
    };
  }

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
      const res = await axios.put(
        `/api/users/${this.props.user.id}/password`,
        this.state.values
      );

      if (res.data && res.data.errors) {
        if (res.status === 401) {
          this.setState(state => ({ ...state, errors: res.data.errors }));
        } else {
          this.setState(state => ({
            ...state,
            errors: { password: '', newPassword: res.data.errors.password },
          }));
        }
      } else {
        this.props.history.push('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { values, errors } = this.state;
    const { password, newPassword } = values;
    return (
      <section className="section">
        <HalfPage>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="password">Password</label>
              <p className="control">
                <input
                  name="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={this.handleChange}
                />
              </p>
              {errors.password && errors.password.length && (
                <p className="help is-danger">{errors.password}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="newPassword">New Password</label>
              <p className="control">
                <input
                  name="newPassword"
                  type="password"
                  className="input"
                  value={newPassword}
                  onChange={this.handleChange}
                />
              </p>
              {errors.newPassword && errors.newPassword.length && (
                <p className="help is-danger">{errors.newPassword}</p>
              )}
            </div>
            <FormButtons />
          </form>
        </HalfPage>
      </section>
    );
  }
}

export default withRouter(ChangePassword);
