import React, { Component } from 'react';

import HalfPage from '../HalfPage/HalfPage';
import Markup from './Markup';
import axios from '../../axios';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: '',
        agenda: '',
        location: '',
        startTime: '',
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
      const { data } = await axios.post('/api/groups', {
        ...this.state.values,
        startTime: new Date(this.state.values.startTime),
      });

      if (data.errors) {
        this.setState(state => ({ ...state, errors: data.errors }));
      } else {
        this.props.gotGroup(data);
        this.props.handleCancel();
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
            handleCancel={this.props.handleCancel}
          />
        </HalfPage>
      </section>
    );
  }
}

export default CreateGroup;
