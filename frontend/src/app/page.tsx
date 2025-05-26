'use client';

import styled from 'styled-components';
import Text from '../design-system/Text';

const Wrapper = styled.main`
  height: 100vh;
  background-color: #1e293b;
  color: #e2e8f0;
  font-family: 'Geist Sans', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  return (
    <>
      

      {/* create a global css file and import the google font from it
          create a new folder of "design-system", where we can store all the reusable components like Text, Button etc..
          and use the Text component from it */}

      <Wrapper>
        <Text size="lg" weight="bold" color="#60a5fa">
          NextCommit
        </Text>
      </Wrapper>
    </>
  );
}

{/* use styled-components for styling
    create a theme file to share all the common style (do it with styled-components as well) */}

