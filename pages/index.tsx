import { FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import {
  Container,
  ResultList,
  ResultItem,
  Center,
} from '../styles/pages/Home';

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
