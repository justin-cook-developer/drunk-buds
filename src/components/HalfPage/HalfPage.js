import React from 'react';

const HalfPage = ({ children }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-half">{children}</div>
    </div>
  );
};

export default HalfPage;
