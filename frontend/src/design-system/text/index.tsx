import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2<{ size?: string }>`
  font-size: ${({ size }) => size || '24px'};
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Heading: React.FC<{
  children: React.ReactNode;
  size?: string;
}> = ({ children, size }) => (
  <StyledHeading size={size}>{children}</StyledHeading>
);

const StyledParagraph = styled.p<{ color?: string }>`
  font-size: 16px;
  color: ${({ color }) => color || '#444'};
`;

export const Paragraph: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({ children, color }) => (
  <StyledParagraph color={color}>{children}</StyledParagraph>
);

const StyledLabel = styled.span<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }) => color || '#888'};
`;

export const Label: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color,
}) => <StyledLabel color={color}>{children}</StyledLabel>;
