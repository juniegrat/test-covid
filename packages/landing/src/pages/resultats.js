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
import Results from 'containers/Donation/Results';
import { getDocuments } from 'common/lib/firebase/firebase.util';

const Resultats = ({ tests }) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Résultats</title>
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
          <Results tests={tests} />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export async function getStaticProps() {
  const tests = await getDocuments('tests');
  return {
    props: {
      tests: JSON.stringify(tests)
    }
  };
}
export default Resultats;
