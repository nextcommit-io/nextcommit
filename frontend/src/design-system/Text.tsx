'use client';

import styled from 'styled-components';

type TextProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'bold';
  color?: string;
};

const StyledText = styled.span<{
  $size: 'sm' | 'md' | 'lg';
  $weight: 'normal' | 'bold';
  $color?: string;
}>`
  font-size: ${({ $size }) =>
    $size === 'sm' ? '0.875rem' :
    $size === 'lg' ? '4rem' :
    '1rem'};

  font-weight: ${({ $weight }) => ($weight === 'bold' ? 600 : 400)};
  color: ${({ $color }) => $color || 'inherit'};
`;

export default function Text({ children, size = 'md', weight = 'normal', color }: TextProps) {
  return (
    <StyledText $size={size} $weight={weight} $color={color}>
      {children}
    </StyledText>
  );
}
