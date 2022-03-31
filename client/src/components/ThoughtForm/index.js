//TODO: THOUGHT FORM PAGE 
//! Import dependencies
import React from 'react';

//! Import ThoughtForm component
const ThoughtForm = () => {
  return (
    <div>
      <p className="m-0">Character Count: 0/280</p>
      <form className="flex-row justify-center justify-space-between-md align-stretch">
        <textarea
          placeholder="Here's a new thought..."
          className="form-input col-12 col-md-9"></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

//! Export ThoughtForm
export default ThoughtForm;
