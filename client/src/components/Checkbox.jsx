// Checkbox.js
import React from 'react';
import styled from 'styled-components';

const Checkbox = () => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" />
        <div className="checkmark" />
        <span className="label-text">Symptom</span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 1.2rem;
    user-select: none;
  }

  .container input {
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    position: absolute;
  }

  .checkmark {
    --clr: #007ea7;
    position: relative;
    height: 1.3em;
    width: 1.3em;
    background-color: #ccc;
    border-radius: 0.5rem;
    transition: background-color 300ms, transform 300ms;
  }

  .container input:checked ~ .checkmark {
    background-color: var(--clr);
    transform: scale(1.1);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 0.45em;
    top: 0.25em;
    width: 0.25em;
    height: 0.5em;
    border: solid ${({ theme }) => theme.colors.white.DEFAULT};
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
  }

  .label-text {
    color: ${({ theme }) => theme.colors.white.DEFAULT};
    margin-left: 10px;
  }
`;

export default Checkbox;
