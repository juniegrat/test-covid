import React, { useState } from 'react';
// NEXT
import Link from 'next/link';
// LIBRAIRIES
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { BackTop, notification, message } from 'antd';
import { Formik } from 'formik';
// COMPONENTS
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import ResultForm from './ResultForm';
import ResultCard from './ResultCard';
// STYLE
import SectionWrapper, { ContentArea, TextWrapper } from './results.style';
//ICONS
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';
import { arrowUp } from 'react-icons-kit/feather/arrowUp';
//FIREBASE
import { batchOperations } from 'common/lib/firebase/firebase.util';
import { serverTimestamp, increment } from 'common/lib/firebase/firebase';
import ResultsChart from './ResultsChart';

const Results = (props) => {
  const data = props.tests;
  const [test, setTest] = useState(null);
  const handleSubmit = async (values) => {
    message.loading('Chargement..', 0);
    const addResult = await batchOperations([
      {
        operation: 'set',
        collectionKey: 'tests',
        docRef: values.testId,
        data: {
          /*  ...values, */
          testId: values.testId,
          result: values.result,
          resultAt: serverTimestamp()
        },
        options: { merge: true }
      },
      {
        operation: 'set',
        collectionKey: 'aggregations',
        docRef: '--stats--',
        data: {
          negativeTests: values.result === 'negative' && increment,
          resultTotal: increment
        },
        options: { merge: true }
      }
    ]);
    if ((await addResult) === true) {
      message.destroy();
      notification.success({
        message: `Résultat mis à jour `,
        description: 'Lorem ipsum dolor sit amet',
        placement: 'bottomLeft'
      });
    }
    setTest(null);
  };
  return (
    <SectionWrapper>
      {test !== null && (
        <Formik
          initialValues={{
            testId: test?.id,
            result: test?.result
          }}
          validate={(values) => {
            const errors = {};
            if (!values.testId) {
              errors.testId = 'Required';
            }
            if (!values.result) {
              errors.result = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          <ResultForm
            test={test}
            isVisible={test !== null}
            onCancel={() => {
              setTest(null);
            }}
          />
        </Formik>
      )}
      <BackTop>
        <BackTopLabel>
          <Icon icon={arrowUp} size={30} />
        </BackTopLabel>
      </BackTop>
      <Container>
        <ContentArea>
          <TextWrapper>
            <Heading content="Mettez à jour les formulaires patients COVID-19" />
            <p className="desc">
              Retrouvez une liste de tous les formulaires de prise de contact et
              cliquer simplement sur une entrée pour y ajouter le résultat,
              l'identifiant et le document. Les données seront automatiquement
              envoyé à la sécurité sociale.
              <Link href="#learn-more">
                <a>
                  En savoir plus <Icon icon={chevronRight} />
                </a>
              </Link>
            </p>
            <ResultsChart />
          </TextWrapper>
          <ResultCard tests={data} setTest={setTest} />
        </ContentArea>
      </Container>
    </SectionWrapper>
  );
};

const BackTopLabel = styled(BackTop)`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 14px;
  background-color: ${themeGet('colors.primary')};
  color: #fff;
  text-align: center;
  font-size: 14px;

  &::hover {
    background-color: ${themeGet('colors.primaryHover')};
  }
`;

export default Results;
