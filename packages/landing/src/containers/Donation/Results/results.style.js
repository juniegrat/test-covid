import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 70px 0;
  @media only screen and (max-width: 768px) {
    padding: 50px 0;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ContentArea = styled.div`
  width: 100%;
`;

export const ResultsWrapper = styled.div`
  margin-top: 50px;
`;

export const TitleWrapper = styled.div`
  margin: 0;
  p {
    margin-top: 10px;
    color: ${themeGet('colors.labelColor')};
  }
`;

export const TextWrapper = styled.div`
  margin-right: 30px;
  @media only screen and (max-width: 1366px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    margin-top: 30px;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    color: ${themeGet('colors.textPrimary')};
    font-size: 40px;
    line-height: 1.62;
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) {
      font-size: 34px;
      margin-bottom: 15px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 24px;
    }
  }

  .desc {
    line-height: 2.19;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1360px) {
      font-size: 15px;
    }
    @media only screen and (max-width: 1024px) {
      line-height: 1.8;
    }
    a {
      font-size: 15px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      color: ${themeGet('colors.linkColor')};
      letter-spacing: -0.2px;
      margin-left: 10px;
      i {
        line-height: 1;
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 5px;
      }
    }
  }
`;

export const DonationProgressbar = styled.div`
  width: 100%;
  margin-top: 50px;
  @media only screen and (max-width: 1200px) {
    margin-top: 30px;
  }

  p {
    margin-top: 0;
    @media only screen and (max-width: 991px) {
      margin: 0 0 10px;
    }
  }

  h5 {
    font-size: 15px;
    line-height: 2.33;
    font-weight: 400;
    color: ${rgba('#02073e', 0.6)};
  }
`;

export const BarArea = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 50px 23px 0;
  @media only screen and (max-width: 991px) {
    margin-bottom: 20px;
  }

  .last-donate-time {
    line-height: 30px;
    color: ${rgba('#02073E', 0.5)};
    @media only screen and (max-width: 480px) {
      display: none;
    }
  }
`;

export const CurrentStatus = styled.p`
  color: ${themeGet('colors.textPrimary')};
  font-size: 17px;
  line-height: 1.48;
  strong {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 500;
    font-size: 30px;
    line-height: 25px;
    @media only screen and (max-width: 1024px) {
      font-size: 26px;
    }
  }
`;

export const ResultCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0px 3px 24px rgba(100, 135, 167, 0.08);
  position: relative;
  margin-bottom: 32px;
  h3 {
    font-weight: bold;
    font-size: 30px;
    text-transform: capitalize;
    color: #0f2137;
    margin-bottom: 0;
    line-height: 1;
    margin-top: -10px;
  }
  h4 {
    font-weight: 500;
    font-size: 28px;
    letter-spacing: -0.55px;
    line-height: 1;
    margin-bottom: 0;
    color: #0f2137;
  }
  .resultBtn {
    width: 100%;
    background-color: #108aff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    min-height: 60px;
    margin-top: 50px;
    transition: all 500ms ease;
    i {
      margin-left: 10px;
    }
    &:hover {
      background-color: #0f2137;
      color: #fff;
    }
  }
  &.recommended {
    background-color: #108aff;
    @media (max-width: 667px) {
      margin-top: 30px;
    }
    h3,
    h4,
    p,
    span.patientInfoLabel {
      color: #fff;
    }
    ul li,
    ul li i {
      color: #fff;
    }
    .resultBtn {
      background-color: #fff;
      color: #108aff;
      &:hover {
        background-color: #0f2137;
        color: #fff;
      }
    }
  }
`;
export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn2 0.8s linear;
`;
export const CardBody = styled.div`
  display: flex;
`;
export const Result = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  animation: fadeIn2 0.8s linear;
  border-right: 1px solid ${themeGet('colors.lightGray', '#f0f0f0')};
  .result {
    font-size: 25px;
    font-weight: 700;
  }
`;
export const PatientInfo = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  flex-direction: column;
  align-items: right;
  text-align: right;
  animation: fadeIn2 0.8s linear;
  > span.patientInfoLabel {
    margin-bottom: 12px;
  }
`;
export const PatientName = styled.div`
  text-align: right;
  p {
    margin-top: 5px;
    font-size: 6px;
    line-height: 19px;
    letter-spacing: -0.5px;
    color: #8d909c;
    line-height: 1;
  }
`;

export default SectionWrapper;
