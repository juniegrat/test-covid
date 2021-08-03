import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  padding-bottom: 70px;
  margin-top: 16em;
  @media only screen and (max-width: 768px) {
    padding-bottom: 50px;
  }
`;

export const DonationFormWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 20px 50px rgba(54, 91, 125, 0.05);
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  .rc-tabs-bar {
    border-bottom: 0;
    display: flex;
    > div {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      width: 100%;
      @media only screen and (max-width: 768px) {
        margin-top: 30px;
        padding: 0 30px;
      }
    }
    .rc-tabs-tab {
      float: none;
      margin: 0;
    }
    .rc-tabs-nav-scroll,
    .rc-tabs-nav-list {
      @media only screen and (min-width: 1025px) {
        display: flex;
        justify-content: center;
        width: auto;
      }
    }
    .rc-tabs-ink-bar {
      display: none !important;
    }
    .rc-tabs-tab-active {
      > div {
        color: ${themeGet('colors.textPrimary')};
      }
      span {
        background-color: ${themeGet('colors.primary')};
        color: #fff;
      }
    }
  }
  .rc-tabs-nav {
    float: none;
    > div {
      display: flex;
    }
  }

  .rc-tabs-top {
    border-bottom: 0;
    display: grid;
    align-items: center;
    .rc-tabs-tabpane {
      padding: 0 20px;
      @media only screen and (max-width: 767px) {
        padding: 0;
      }
    }
  }
  .rc-tabs-nav {
    display: none;
  }
`;

export const Illustration = styled.figure`
  border-radius: 10px 0 0 10px;
  margin: 0;
  padding: 40px 55px 55px;
  @media only screen and (max-width: 1024px) {
    padding: 40px 45px;
  }
  @media only screen and (max-width: 768px) {
    min-height: 680px;
    border-radius: 10px 10px 0 0;
  }
  @media only screen and (max-width: 767px) {
    min-height: 550px;
    padding: 30px;
  }
  h2 {
    font-size: 36px;
    line-height: 1.5;
    letter-spacing: -1px;
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 24px;
    }
  }
  p {
    font-size: 16px;
    line-height: 2.2;
    max-width: 400px;
    @media only screen and (max-width: 768px) {
      max-width: 490px;
    }
  }
`;

export const DonationForm = styled.div`
  padding: 55px;
  @media only screen and (max-width: 1024px) {
    padding: 45px 30px;
  }
  @media only screen and (max-width: 767px) {
    padding: 30px;
  }
  .two-col {
    grid-column-gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }
  .input-field {
    margin-bottom: 20px;
    label {
      color: ${themeGet('colors.textPrimary')};
      font-size: 16px;
      line-height: 1.33;
      font-weight: 400;
    }
  }
  input {
    margin-bottom: 20px;
    border-radius: 5px;
    min-height: 60px;
    @media only screen and (max-width: 1024px) {
      min-height: 50px;
    }
  }
  .ssn {
    input {
      border-radius: 5px;
      min-height: 60px;
      padding-left: 22px;
      @media only screen and (max-width: 1024px) {
        min-height: 50px;
      }
    }
    .input-icon {
      font-size: 18px;
      min-height: 60px;
      margin-right: 8px;
      @media only screen and (max-width: 1024px) {
        min-height: 50px;
      }
    }
  }
  .remember_me {
    margin-top: 20px;
    label {
      font-size: 15px;
      span {
        font-weight: 400;
      }
    }
    @media only screen and (max-width: 767px) {
      align-items: center;
      label div {
        top: -10px;
      }
    }
  }
  button {
    border-radius: 5px;
    min-height: 60px;
    width: 100%;
    @media only screen and (max-width: 767px) {
      min-height: 50px;
      font-size: 14px;
    }
  }
  .submit-now {
    margin-top: 20px;
    padding: 0;
  }
`;

export const FormEnd = styled.div`
  padding: 55px;
  @media only screen and (max-width: 1024px) {
    padding: 45px 30px;
  }
  button {
    border-radius: 5px;
    min-height: 60px;
    width: 100%;
    @media only screen and (max-width: 768px) {
      min-height: 50px;
    }
  }
`;
