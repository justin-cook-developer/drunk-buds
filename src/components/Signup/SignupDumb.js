import React, { Component } from 'react';

import HalfPage from '../HalfPage/HalfPage';
import Markup from './Markup';
import axios from '../../axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
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
      const { data } = await axios.post(
        '/auth/local/signup',
        this.state.values
      );

      if (data.errors) {
        this.setState(state => ({ ...state, errors: data.errors }));
      }
      console.log(data);
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

export default Signup;
