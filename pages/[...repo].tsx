import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Link from 'next/link';

import { BackToHome, Container, StyledRepo } from '../styles/pages/Detail';

interface Repo {
  name: string;
  description: string;
  full_name: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uri = `https://api.github.com/repos/${(params.repo as string[]).join(
    '/'
  )}`;

  const res = await fetch(uri);

  let repo = null;
  if (res.ok) {
    repo = await res.json();
  }

  return {
    props: {
      repo,
    },
    revalidate: 1,
  };
};

export default function Repo({ repo }: { repo: Repo }) {
  const router = useRouter();

  if (!router.isFallback && !repo) {
    return (
      <>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <Container>
      {router.isFallback ? (
        <p>Loading...</p>
      ) : (
        <>
          <Head>
            <title>{`${repo.full_name} - Detail`}</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <div>
            <BackToHome>
              <Link href='/'>
                <a>👈 Back to home</a>
              </Link>
            </BackToHome>

            <StyledRepo>
              <span>{repo.name}</span>
              <p>{repo.description}</p>
            </StyledRepo>
          </div>
        </>
      )}
    </Container>
  );
}
