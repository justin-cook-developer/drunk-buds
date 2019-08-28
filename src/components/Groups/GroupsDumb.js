import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Groups extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    console.log(this.props.groups);

    return (
      <section className="section">
        <div className="container has-text-centered">
          <button type="button" className="button is-primary">
            Create a new group!
          </button>
        </div>
        <div className="content">
          <ul className="list">
            {this.props.groups.map(group => (
              <li className="list-item" key={group.id}>
                <Link to={`/groups/${group.id}`}>
                  {group.name}: {group.startTime}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default Groups;
