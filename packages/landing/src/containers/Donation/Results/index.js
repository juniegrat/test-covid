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
import ResultCards from './ResultCards';
// STYLE
import SectionWrapper, { ContentArea, TextWrapper } from './results.style';
//ICONS
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';
import { arrowUp } from 'react-icons-kit/feather/arrowUp';
//FIREBASE
import {
  batchOperations,
  uploadFiles
} from 'common/lib/firebase/firebase.util';
import {
  serverTimestamp,
  increment,
  functions,
  decrement,
  deleteField
} from 'common/lib/firebase/firebase';
import ResultsChart from './ResultsChart';
import superjson from 'superjson';
import findById from '../../../common/utils/findById';

const Results = (props) => {
  const tests = props.tests;
  const aggregations = props.aggregations;
  const [test, setTest] = useState(null);
  const initialValues = {
    testId: test?.id,
    result: test?.result,
    email: test?.email,
    fullName: test?.fullName,
    document: test?.document
  };

  const handleSubmit = async (values, initialValues) => {
    try {
      const [previousValues] = findById(values.testId, tests);
      if (values === initialValues) {
        setTest(null);
        return;
      }
      const documentIsFile = typeof values?.document?.name === 'string';
      const isSameResult = values.result === previousValues.result;
      const isNewResult = !previousValues.result;
      const documentDeleted = !values.document && previousValues.document;
      message.loading('Chargement...', 0);
      const path = `results/${values?.fullName}/${values?.document?.name}/`;
      const [uploadedFile] = documentIsFile
        ? await uploadFiles([
            {
              file: { ...values.document, name: 'document' },
              path
            }
          ])
        : [];
      const setResults = await batchOperations([
        {
          operation: 'set',
          collectionKey: 'tests',
          docRef: values.testId,
          data: {
            testId: values.testId,
            result: values.result,
            resultAt: serverTimestamp(),
            ...(uploadedFile &&
              documentIsFile && {
                document: uploadedFile
              }),
            ...(documentDeleted && { document: deleteField })
          },
          options: { merge: true }
        },
        values.result &&
          !isSameResult && {
            operation: 'set',
            collectionKey: 'aggregations',
            docRef: '--stats--',
            data: {
              ...(isNewResult
                ? {
                    ...(values.result === 'negative'
                      ? { negativeTests: increment }
                      : { positiveResult: increment }),
                    totalResults: increment
                  }
                : {
                    negativeTests:
                      values.result === 'negative' ? increment : decrement,
                    positiveResult:
                      values.result === 'positive' ? increment : decrement
                  })
            },
            options: { merge: true }
          }
      ]);
      if ((await setResults) === true) {
        message.destroy();
        notification.success({
          message: `Résultat mis à jour `,
          description: 'Lorem ipsum dolor sit amet',
          placement: 'bottomLeft'
        });
      }
      /* const sendMail = await functions.httpsCallable('sendMail');
      await sendMail({
        email: values.email,
        fullName: values.fullName
      });*/
      setTest(null);
    } catch (e) {
      message.destroy();
      console.group('Erreur:');
      console.error(e);
      console.groupEnd();
      message.error('Erreur...');
      notification.error({
        message: `Oups....`,
        description: 'Il y a eu une erreur, veuillez réessayer plus tard',
        placement: 'bottomLeft'
      });
    }
    return;
  };
  return (
    <SectionWrapper>
      {test !== null && (
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.testId) {
              errors.testId = 'Ce champs est requis';
            }
            if (!values.result) {
              errors.result = 'Ce champs est requis';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, initialValues);
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
              l&#39;identifiant et le document. Les données seront
              automatiquement envoyé à la sécurité sociale.
              <Link href="#learn-more">
                <a>
                  En savoir plus <Icon icon={chevronRight} />
                </a>
              </Link>
            </p>
            <ResultsChart aggregations={aggregations} />
          </TextWrapper>
          <ResultCards tests={tests} setTest={setTest} />
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

  &:hover {
    background-color: ${themeGet('colors.primaryHover')};
  }
`;

export default Results;
