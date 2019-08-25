import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="section has-text-centered">
      <div className="container content has-text-weight-light	">
        <h1 className="title is-italic is-size-2">Drunk Tracker</h1>
        <h2 className="subtitle is-size-4">
          Never lose your drunk friends again!
        </h2>
      </div>
      <div className="container content">
        <p>
          You're at the bar with some friends, having a good time, when you turn
          around and one of your friends is gone! Next thing you know, you've
          been looking for your friend for an hour and you finally find him
          running a casual 5k on the next street over. Every group has one! With
          Drunk Tracker you will always know where your drinking buddies are at,
          and will be alerted if they venture too far from your group.
        </p>
      </div>
      <div className="container content">
        <Link to="/groups" className="button is-primary">
          Start drinking responsibly!
        </Link>
      </div>
    </section>
  );
};

export default Home;
