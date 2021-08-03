import React from 'react';
import Zoom from 'react-reveal/Zoom';

import Text from 'common/components/Text';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import Section, {
  ContentWrapper,
  BannerContent,
  Illustration,
  ButtonGroup,
  ImageGroup
} from './banner.style';

const Banner = () => {
  return (
    <Section id="home">
      <ContentWrapper>
        <Container>
          <BannerContent>
            <Heading
              as="h1"
              content="Faites-vous tester & recevez vos résultats"
            />
            <Text
              className="banner-caption"
              content="Remplissez le formulaire de prise d'information et recevez une alerte directement par email ou SMS lorsque vos résultats sont prêts"
            />
            <ButtonGroup>
              <Button title="Formulaire" />
              <Button title="Résultats" className="button-white" />
            </ButtonGroup>
          </BannerContent>
        </Container>
        <Illustration />
      </ContentWrapper>
    </Section>
  );
};

export default Banner;
