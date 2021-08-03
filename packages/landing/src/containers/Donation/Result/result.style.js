import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const ResultWrapper = styled.div`
  width: 80%;
  margin: 1em auto 71px;
  padding: 2em;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 20px 50px rgba(54, 91, 125, 0.05);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media only screen and (min-width: 1201px) {
    max-width: 1170px;
    width: 100%;
  }
  @media only screen and (max-width: 667px) {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 4em;
  display: flex;
  justify-content: space-evenly;
`;
