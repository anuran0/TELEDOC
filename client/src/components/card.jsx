// src/components/Card.js
import React from 'react';
import styled from 'styled-components';

const Card = ({ image, title, description }) => {
  return (
    <StyledCard>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.rich_black.DEFAULT};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px; /* Adjust width as needed */
  margin: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  .card-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .card-content {
    padding: 20px;
    color: ${({ theme }) => theme.colors.white.DEFAULT};

    h3 {
      margin-top: 0;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.cerulean.DEFAULT};
    }

    p {
      margin: 10px 0 0;
      font-size: 1rem;
    }
  }
`;

export default Card;
