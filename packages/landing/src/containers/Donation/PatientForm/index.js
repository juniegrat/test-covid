import React, { useState } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import Text from 'common/components/Text';
import Input from 'common/components/Input';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import TabTitle from './TabTitle';
import {
  DonationForm,
  DonationFormWrapper,
  FormEnd,
  Illustration,
  Section
} from './patientForm.style';
import { ErrorMessage, Form, Formik, useField, useFormikContext } from 'formik';
import faker from 'faker/locale/fr';
import {
  batchOperations,
  getNewDocRef
} from 'common/lib/firebase/firebase.util';
import {
  increment,
  serverTimestamp,
  functions
} from 'common/lib/firebase/firebase';
import LottieAnimation from 'common/components/Lottie/index';
// LOTTIE ANIMATION
import check1 from 'common/assets/image/lottie/check-zinli.json';

const DonationFormSection = () => {
  const [activeKey, setActiveKey] = useState('1');

  const CustomField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return props.inputType === 'checkbox' ? (
      <CheckBox
        {...field}
        {...props}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    ) : (
      <Input
        {...field}
        {...props}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    );
  };

  const onSubmit = async (values) => {
    /*for (let x = 0; x < 10; x++) {
      const newDocRef = await getNewDocRef('tests');
      await batchOperations([
        {
          operation: 'set',
          collectionKey: 'tests',
          docRef: newDocRef.id,
          data: {
            birthday: '21-12-2021',
            email: faker.internet.email(),
            fullName: faker.name.findName(),
            phoneNumber: faker.phone.phoneNumber(),
            ssn: faker.datatype.number(),
            createdAt: serverTimestamp()
          }
        },
        {
          operation: 'set',
          collectionKey: 'aggregations',
          docRef: '--stats--',
          data: {
            totalTests: increment,
            lastTestAt: serverTimestamp(),
            lastTestRef: newDocRef
          },
          options: { merge: true }
        }
      ]);
    }*/
    const newDocRef = await getNewDocRef('tests');
    await batchOperations([
      {
        operation: 'set',
        collectionKey: 'tests',
        docRef: newDocRef.id,
        data: {
          ...values,
          createdAt: serverTimestamp()
        }
      },
      {
        operation: 'set',
        collectionKey: 'aggregations',
        docRef: '--stats--',
        data: {
          totalTests: increment,
          lastTestAt: serverTimestamp(),
          lastTestRef: newDocRef
        },
        options: { merge: true }
      }
    ]);
    const sendMail = await functions.httpsCallable('sendMail');
    const sendSMS = functions.httpsCallable('sendSMS');
    await sendMail({
      email: values.email,
      fullName: values.fullName
    });
    await sendSMS({
      phoneNumber: values.phoneNumber, //TODO Replace with doctor phone number
      msg: `
          Bonjour,
${values.fullName} vient de remplir le formulaire de test Covid-19, veuillez mettre à jour le résultat sur le portail médecin: https://localhost:3000/resultats`
    });
  };

  return (
    <Section id="donation">
      <Container>
        <DonationFormWrapper>
          <Illustration>
            <Heading
              content={
                activeKey === '1'
                  ? 'Formulaire prise de contact'
                  : 'Merci, votre demande a bien été enregistré!'
              }
            />
            <Text
              content={
                activeKey === '1'
                  ? 'Remplissez le formulaire de prise de contact et recevez une alerte directement par email ou SMS lorsque vos résultats sont prêts.'
                  : 'Vous recevrez les résultats de 15 à 30 minutes après la fin du test'
              }
            />
          </Illustration>
          <Tabs activeKey={activeKey}>
            <TabPane tab={<TabTitle step="01" title="Select amount" />} key="1">
              <DonationForm>
                <Formik
                  initialValues={{
                    fullName: '',
                    email: '',
                    birthday: ''
                  }}
                  validate={(values) => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    onSubmit(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="two-col">
                        <CustomField
                          name="fullName"
                          inputType="text"
                          //isMaterial
                          label="Nom complet"
                        />
                        <CustomField
                          name="email"
                          inputType="email"
                          //isMaterial
                          label="Adresse email"
                        />
                      </div>
                      <CustomField
                        name="phoneNumber"
                        inputType="tel"
                        //isMaterial
                        label="Numéro de téléphone"
                      />
                      <ErrorMessage name="phoneNumber" component="div" />
                      <CustomField
                        name="birthday"
                        inputType="date"
                        //sMaterial
                        label="Date de naissance"
                      />
                      <ErrorMessage name="birthday" component="div" />
                      <CustomField
                        icon={<>+</>}
                        inputType="text"
                        name="ssn"
                        iconPosition="right"
                        className="ssn"
                        //isMaterial
                        label="Numéro de sécurité sociale"
                      />
                      <ErrorMessage name="birthday" component="div" />

                      <Button
                        title="Envoyer"
                        className="submit-now"
                        type="submit"
                        onClick={() => setActiveKey('2')}
                        disabled={isSubmitting}
                      />
                    </Form>
                  )}
                </Formik>
              </DonationForm>
            </TabPane>
            <TabPane tab={<TabTitle step="02" title="Ending" />} key="2">
              <FormEnd>
                <LottieAnimation
                  animation={check1}
                  width={150}
                  height={150}
                  loop={false}
                />
                <Button
                  title="Retourner à l'acceuil"
                  onClick={() => setActiveKey('1')}
                />
              </FormEnd>
            </TabPane>
          </Tabs>
        </DonationFormWrapper>
      </Container>
    </Section>
  );
};

export default DonationFormSection;
