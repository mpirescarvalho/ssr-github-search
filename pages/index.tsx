import { FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;

  h1 {
    margin-bottom: 20px;
  }

  input {
    outline: 0;
    border: 0;
    padding: 12px 20px;
    max-width: 300px;
    width: 100%;
    background: #333;
    color: #fff;
    ::placeholder {
      color: #999;
    }
  }

  div.result {
  }
`;

const ResultList = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 380px;
  min-height: 200px;
  max-height: 480px;
  background: #333;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  overflow-y: scroll;
`;

const ResultItem = styled.a`
  padding: 12px 20px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;

  span {
    font-weight: bold;
    font-size: 16px;
  }

  p {
    margin-top: 5px;
  }

  & + & {
    border-top: 1px solid #444;
  }

  :hover {
    background: #555;
  }
`;

const Center = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    color: #999;
  }
`;

interface Repo {
  name: string;
  description: string;
  full_name: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [fallback, setFallback] = useState('Search for a github username 👆');

  useEffect(() => setRepos([]), [username]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (!response.ok) {
      setRepos([]);
      setFallback(`No matches for username ${username}`);
    } else {
      const repos = await response.json();
      setRepos(repos);
    }
  }

  return (
    <Container>
      <Head>
        <title>Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Github user search</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='username'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </form>

      <ResultList>
        {repos && repos.length > 0 ? (
          repos.map((repo, index) => (
            <Link key={index} href={`/${repo.full_name}`} passHref>
              <ResultItem>
                <span>{repo.name}</span>
                <p>{repo.description}</p>
              </ResultItem>
            </Link>
          ))
        ) : (
          <Center>
            <p>{fallback}</p>
          </Center>
        )}
      </ResultList>
    </Container>
  );
}
