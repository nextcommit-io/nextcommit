import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1px solid #eaeaea;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledCard>{children}</StyledCard>
);
