import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs, { TabPane } from 'rc-tabs';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Input from 'common/components/Input';
import CheckBox from 'common/components/Checkbox/index';
import Button from 'common/components/Button';
import LoginModalWrapper from './loginForm.style';
import 'rc-tabs/assets/index.css';
import { useAuth } from 'common/contexts/AuthProvider';
import { Formik, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import moment from 'moment';
import sub from 'date-fns/sub';
import format from 'date-fns/format';

const LoginModal = ({
  row,
  col,
  btnStyle,
  contentWrapper,
  outlineBtnStyle,
  descriptionStyle
}) => {
  const { signInWithEmail, signUpWithEmailAndPassword } = useAuth();
  const LoginButtonGroup = ({ disabled }) => (
    <Fragment>
      <Button
        className="default"
        title="CONNEXION"
        {...btnStyle}
        disabled={disabled}
        type="submit"
      />
      <Button
        title="Mot de passe oublié"
        variant="textButton"
        {...outlineBtnStyle}
      />
    </Fragment>
  );
  const SignupButtonGroup = ({ disabled }) => (
    <Fragment>
      <Button
        className="default"
        title="INSCRIPTION"
        {...btnStyle}
        disabled={disabled}
        type="submit"
      />
    </Fragment>
  );
  const CustomField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return props.type === 'checkbox' ? (
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

  const signUp = async (values) => {
    const data = await signUpWithEmailAndPassword(
      values.email,
      values.birthday
    );
    console.log(data);
  };
  const signIn = async (values) => {
    const data = await signInWithEmail(values.email, values.birthday);
    console.log(data);
  };

  return (
    <LoginModalWrapper>
      <Box className="row" {...row}>
        <Box className="col tabCol" {...col}>
          <Box {...contentWrapper}>
            <Tabs
              defaultActiveKey="loginForm"
              animated={{ tabPane: true }}
              // renderTabBar={() => <ScrollableInkTabBar />}
              // renderTabContent={() => <TabContent />}
            >
              <TabPane tab="CONNEXION" key="loginForm">
                <Text
                  content="Connectez-vous avec vos identifiants pour pouvoir accéder aux résultats"
                  {...descriptionStyle}
                />
                <Formik
                  initialValues={{
                    email: '',
                    birthday: ''
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    signIn({
                      ...values,
                      birthday: format(values.birthday.toDate(), 'dd-MM-yyyy')
                    });
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <CustomField
                        name="email"
                        type="email"
                        isMaterial
                        label="Adresse Email"
                      />
                      <ErrorMessage name="email" component="div" />
                      <CustomField
                        name="birthday"
                        type="date"
                        isMaterial
                        label="Date de naissance"
                        format="DD-MM-YYYY"
                        picker="date"
                        disabledDate={(current) =>
                          current && current > sub(new Date(), { years: 11 })
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
                      <div>
                        <LoginButtonGroup disabled={isSubmitting} />
                      </div>
                      {/*  <CustomField
                        name="remember"
                        type="checkbox"
                        id="remember"
                        htmlFor="remember"
                        labelText="Remember Me"
                      /> */}
                    </Form>
                  )}
                </Formik>
              </TabPane>
              <TabPane tab="INSCRIPTION" key="registerForm">
                <Text
                  content="Inscrivez-vous en quelques clics pour accéder aux résultats"
                  {...descriptionStyle}
                />
                <Formik
                  initialValues={{
                    fullName: '',
                    email: '',
                    birthday: ''
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    signUp(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <CustomField
                        name="fullName"
                        type="text"
                        isMaterial
                        label="Nom complet"
                      />
                      <ErrorMessage name="fullName" component="div" />
                      <CustomField
                        name="email"
                        type="email"
                        isMaterial
                        label="Adresse Email"
                      />
                      <ErrorMessage name="email" component="div" />
                      <CustomField
                        name="birthday"
                        type="date"
                        isMaterial
                        label="Date de naissance"
                        format="DD-MM-YYYY"
                        picker="date"
                        disabledDate={(current) =>
                          current && current > sub(new Date(), { years: 11 })
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
                      <div>
                        <SignupButtonGroup disabled={isSubmitting} />
                      </div>
                    </Form>
                  )}
                </Formik>
              </TabPane>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </LoginModalWrapper>
  );
};

// LoginModal style props
LoginModal.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object
};

// LoginModal default style
LoginModal.defaultProps = {
  // Team member row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap'
  },
  // Team member col default style
  col: {
    width: [1, 1 / 2]
  },
  // Description default style
  descriptionStyle: {
    color: 'rgba(52, 61, 72, 0.8)',
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '-0.025em',
    mt: '23px',
    mb: '23px',
    ml: '1px'
  },
  // Content wrapper style
  contentWrapper: {
    pt: ['32px', '56px'],
    pl: ['17px', '32px', '38px', '40px', '56px'],
    pr: '32px',
    pb: ['32px', '56px']
  },
  // Default button style
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500'
  },
  // Outline button outline style
  outlineBtnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#FF825C'
  }
};

export default LoginModal;
