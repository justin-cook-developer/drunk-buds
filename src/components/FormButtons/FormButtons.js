import React from 'react';
import { withRouter } from 'react-router-dom';

const FormButtons = ({ history }) => {
  return (
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <button type="submit" className="button">
          Submit
        </button>
      </p>
      <p className="control">
        <button
          type="button"
          className="button"
          onClick={_ => history.goBack()}
        >
          Cancel
        </button>
      </p>
    </div>
  );
};

export default withRouter(FormButtons);
