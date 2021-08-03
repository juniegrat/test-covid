import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme/donation';
import { ResetCSS } from 'common/assets/css/style';
import {
  GlobalStyle,
  ContentWrapper
} from 'containers/Donation/donation.style';
import Result from 'containers/Donation/Result';
import { getDocument, getDocuments } from 'common/lib/firebase/firebase.util';

function Resultat({ test }) {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Résultat</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="Résultats" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Result result={result} />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}

export async function getStaticPaths() {
  const tests = await getDocuments('tests');
  const paths = tests.map((test) => ({
    params: { id: test.id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const test = await getDocument('tests', params.id);
  return { props: { test: JSON.stringify(test) } };
}

export default Resultat;
