import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateGroup from '../CreateGroup/CreateGroup';

class Groups extends Component {
  state = {
    showForm: false,
  };

  componentDidMount() {
    this.props.getGroups();
  }

  toggleShowForm = () =>
    this.setState(state => ({ showForm: !state.showForm }));

  render() {
    this.props.groups[0] && console.log(typeof this.props.groups[0].startTime);
    return (
      <section className="section">
        {this.state.showForm && (
          <CreateGroup handleCancel={this.toggleShowForm} />
        )}
        {!this.state.showForm && (
          <div className="container has-text-centered">
            <button
              type="button"
              className="button is-primary"
              onClick={this.toggleShowForm}
            >
              Create a new group!
            </button>
          </div>
        )}
        <div className="content">
          <ul className="list">
            {this.props.groups.map(group => {
              const date = new Date(group.startTime);
              return (
                <li className="list-item has-text-centered" key={group.id}>
                  <Link to={`/groups/${group.id}`}>
                    {group.name} : {date.getMonth() + 1} / {date.getDate()} /{' '}
                    {date.getFullYear()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Groups;
