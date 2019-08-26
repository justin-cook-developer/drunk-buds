import React, { Component } from 'react';

import HalfPage from '../HalfPage/HalfPage';
import Markup from '../Signup/Markup';
import axios from '../../axios';

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, username, email } = props.user;
    this.state = {
      values: { username, firstName, lastName, email },
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
      const { data } = await axios.put(
        `/api/users/${this.props.user.id}`,
        this.state.values
      );

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
      <HalfPage>
        <Markup
          signup={false}
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </HalfPage>
    );
  }
}

const UpdateUser = ({ user, gotUser }) => {
  return <UpdateUserForm key={user.id} user={user} gotUser={gotUser} />;
};

UpdateUser.defaultProps = {
  user: {}
}

export default UpdateUser;
