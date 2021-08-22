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
import moment from 'moment';
import sub from 'date-fns/sub';
import add from 'date-fns/add';
import format from 'date-fns/format';
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
import CheckBox from 'common/components/Checkbox';

const DonationFormSection = () => {
  const [activeKey, setActiveKey] = useState('1');

  const CustomField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    switch (props.type) {
      case 'checkbox': {
        return (
          <CheckBox
            {...field}
            {...props}
            onChange={(e) => {
              setFieldValue(field.name, e.target.checked);
            }}
          />
        );
      }
      default: {
        return (
          <Input
            {...field}
            {...props}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        );
      }
    }
  };

  const onSubmit = async (values) => {
    setActiveKey('2');
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
                    phoneNumber: '',
                    birthday: '',
                    ssn: ''
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.fullName) {
                      errors.fullName = 'Ce champs est requis';
                    }
                    if (!values.email) {
                      errors.email = 'Ce champs est requis';
                    }
                    if (!values.phoneNumber) {
                      errors.phoneNumber = 'Ce champs est requis';
                    }
                    if (!values.birthday) {
                      errors.birthday = 'Ce champs est requis';
                    }
                    if (!values.ssn) {
                      errors.ssn = 'Ce champs est requis';
                    } else if (values.ssn?.length !== 15) {
                      errors.ssn =
                        'Le numéro de sécurité sociale doit faire 15 caractères';
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    onSubmit({
                      ...values,
                      birthday: format(values.birthday.toDate(), 'dd-MM-yyyy')
                    });
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="two-col">
                        <div>
                          <CustomField
                            name="fullName"
                            type="text"
                            //isMaterial
                            label="Nom complet"
                          />
                          <ErrorMessage name="fullName" component="div" />
                        </div>
                        <div>
                          <CustomField
                            name="email"
                            type="email"
                            //isMaterial
                            label="Adresse email"
                          />
                          <ErrorMessage name="email" component="div" />
                        </div>
                      </div>
                      <div className="two-col">
                        <div>
                          <CustomField
                            name="phoneNumber"
                            type="tel"
                            //isMaterial
                            label="Numéro de téléphone"
                          />
                          <ErrorMessage name="phoneNumber" component="div" />
                        </div>
                        <div>
                          <CustomField
                            name="birthday"
                            type="date"
                            //isMaterial
                            label="Date de naissance"
                            format="DD-MM-YYYY"
                            picker="date"
                            disabledDate={(current) =>
                              current &&
                              current > sub(new Date(), { years: 11 })
                            }
                            defaultPickerValue={moment().subtract(11, 'years')}
                            showTime={false}
                            size={'small'}
                            bordered={false}
                            placeholder={''}
                            suffixIcon={false}
                            style={{ width: '100%', padding: 0 }}
                          />
                          <ErrorMessage name="birthday" component="div" />
                        </div>
                      </div>
                      <CustomField
                        icon={<>+</>}
                        type="mask"
                        name="ssn"
                        iconPosition="right"
                        className="ssn"
                        //isMaterial
                        label="Numéro de sécurité sociale"
                        format={'# ## ## ## ### ### ##'}
                      />
                      <ErrorMessage name="ssn" component="div" />

                      {/*<CustomField
                        type="checkbox"
                        name="check"
                        //isMaterial
                        label="Checkbox"
                      />*/}

                      <Button
                        title="Envoyer"
                        className="submit-now"
                        type="submit"
                        //onClick={() => setActiveKey('2')}
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
