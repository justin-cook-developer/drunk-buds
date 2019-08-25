import React, { Component } from 'react';

import HalfPage from '../HalfPage/HalfPage';
import Markup from './Markup';
import axios from '../../axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: '',
        password: '',
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
      const { data } = await axios.put('/auth/local/login', this.state.values);

      if (data.errors) {
        this.setState(state => ({ ...state, errors: data.errors }));
      } else {
        this.props.gotUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <section className="section">
        <HalfPage>
          <Markup
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </HalfPage>
      </section>
    );
  }
}

export default Login;
