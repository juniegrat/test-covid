import React, { Fragment } from "react";
import Head from "next/head";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/donation";
import { ResetCSS } from "common/assets/css/style";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/Donation/donation.style";

import DonationFormSection from "containers/Donation/PatientForm";

const Donation = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Donation | A react next landing page</title>
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
          <DonationFormSection />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Donation;
