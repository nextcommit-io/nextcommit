'use client';

import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* 
        NOTE:
        I initially tried using next/font to load the Geist font as recommended in the README,
        but the project uses a custom Babel config, which disables SWC and causes a conflict.
        See: https://nextjs.org/docs/messages/babel-font-loader-conflict
      */}

      <main style={styles.main}>
        <h1 style={styles.title}>nextCommit</h1>
      </main>
    </>
  );
}

const styles = {
  main: {
    height: '100vh',
    backgroundColor: '#1e293b', // Slate dark blue
    color: '#e2e8f0', // light gray-blue text
    fontFamily: '"Geist Sans", sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '4rem',
    fontWeight: 600,
    margin: 0,
    color: '#60a5fa', // soft blue
    textShadow: '0 0 6px #3b82f6',
  },
};
