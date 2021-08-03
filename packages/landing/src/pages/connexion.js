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
import LoginModal from 'containers/Donation/LoginForm';
import { useAuth } from 'common/contexts/AuthProvider';

const Donation = () => {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Connexion | Espace médecin</title>
          <meta name="theme-color" content="#FF825C" />
          <meta name="Description" content="React next landing page" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,500,500i,700,700i&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <LoginModal />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Donation;
