import React from 'react';

const Form = () => {
  return (
    <div className="mt-4 ms-4">
      Enter any other symptoms you are experiencing:
      <div className="mt-2 mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <button type="button" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default Form;
