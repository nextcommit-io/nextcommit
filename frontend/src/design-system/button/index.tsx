import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
  display: inline-block;
  padding: 10px 16px;
  background-color: #0070f3;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 10px;
  font-weight: 500;

  &:hover {
    background-color: #0059c1;
  }
`;

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
