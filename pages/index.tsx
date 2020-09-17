import Head from 'next/head';
import styled from 'styled-components';

export const Container = styled.div`
  background: #f55;
  color: #fff;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Hello there</h1>
    </Container>
  );
}
