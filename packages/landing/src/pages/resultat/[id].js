import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
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
import { db } from 'common/lib/firebase/firebase';
import { localeStringOptions, toDateTime } from 'common/utils';
import { useDocumentDataSSR } from 'common/hooks/useFirebaseDataSSR';

function Resultat(props) {
  const testsRef = db.collection('tests').doc(props.testId);
  let [test] = useDocumentDataSSR(testsRef, {
    idField: 'id',
    startWith: props.test,
    transform: (documentData) => ({
      ...documentData,
      createdAt: toDateTime(documentData.createdAt?.seconds).toLocaleString(
        'fr-FR',
        localeStringOptions
      ),
      resultAt: toDateTime(documentData.resultAt?.seconds).toLocaleString(
        'fr-FR',
        localeStringOptions
      )
    })
  });

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
          <Result test={test} />
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
  return {
    props: { test: JSON.parse(JSON.stringify(test)), testId: params.id }
  };
}

Resultat.propTypes = {
  test: PropTypes.object,
  testId: PropTypes.string
};

export default Resultat;
