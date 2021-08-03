import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Button from 'common/components/Button';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import SectionHeading from '../SectionHeading';
import { ButtonWrapper, ResultWrapper } from './result.style';
import NormalClock from 'common/components/Timer';
import toDateTime from 'common/utils/secondToDate';
import LottieAnimation from 'common/components/Lottie/index';
import loading from 'common/assets/image/lottie/laboratorio.json';
import loading1 from 'common/assets/image/lottie/laboratory-icon.json';
import localeStringOptions from 'common/utils/localeStringOptions';

const Result = ({ result }) => {
  const data = JSON.parse(result);
  const deadline = new Date(
    Date.parse(toDateTime(data.createdAt.seconds).toUTCString()) +
      30 * 60 * 1000
  );
  return (
    <Section>
      <Container>
        <SectionHeading className="heading" title="Résultat test COVID-19">
          Voici votre résultat du test passé le 20 Novembre, 2021. Vous pouvez
          télécharger une version pdf ou l'envoyer par email.
        </SectionHeading>
        <ResultWrapper>
          <ResultCol>
            <Row>
              <Info>{data.id}</Info>
              ID du test
            </Row>
            <Row>
              <Info>
                {toDateTime(data.createdAt.seconds).toLocaleString(
                  'fr-FR',
                  localeStringOptions
                )}
              </Info>
              Date d'ajout du formulaire
            </Row>
            {data.result ? (
              <Row>
                <Info>{data.result}</Info>
                Résultat
              </Row>
            ) : (
              <LottieAnimation animation={loading} />
            )}
          </ResultCol>
          <UserInfoCol>
            <Row>
              <Info>{data.fullName}</Info>
              Nom complet
            </Row>
            <Row>
              <Info>{data.phoneNumber}</Info>
              Numéro de téléphone
            </Row>
            <Row>
              <Info>{data.email}</Info>
              Email
            </Row>
            <Row>
              <Info>{data.birthday}</Info>
              Date d'anniversaire
            </Row>
            <Row>
              <Info>{data.ssn}</Info>
              Numéro de sécurité sociale
            </Row>
          </UserInfoCol>
          {data.result ? (
            <ButtonWrapper>
              <Button
                title="Télécharger pdf"
                icon={'⏬'}
                iconPosition={'right'}
                type="button"
              />
              <Button
                title="Envoyer par email"
                icon={'✉️'}
                iconPosition={'right'}
                type="button"
              />
            </ButtonWrapper>
          ) : deadline > new Date() ? (
            <CountDown>
              <CountDownLabel>
                Votre resultat sera prêt dans environ
              </CountDownLabel>
              <NormalClock countdown={deadline} divider="true" />
            </CountDown>
          ) : (
            <CountDownLabel>
              Votre resultat sera prêt très bientôt
            </CountDownLabel>
          )}
        </ResultWrapper>
      </Container>
    </Section>
  );
};

export default Result;

const Section = styled.section`
  padding-top: 70px;
  padding-bottom: 70px;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .heading {
    max-width: 570px;
  }
`;
const ResultCol = styled.div``;
const UserInfoCol = styled.div``;
const Row = styled(Text)`
  display: flex;
  flex-direction: column;
  color: ${themeGet('colors.labelColor')};
`;
const Info = styled.span`
  font-size: 1.5rem;
  color: ${themeGet('colors.black')};
`;
const CountDownLabel = styled(Text)`
  font-size: 2rem;
  text-align: center;
`;
const CountDown = styled.div`
  margin-top: 3em;
`;
