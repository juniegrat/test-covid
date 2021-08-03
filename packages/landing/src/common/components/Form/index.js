import React from 'react';
import PropTypes from 'prop-types';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  useField
} from 'formik';

const CustomField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      locale="fr"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      autoComplete="off"
    />
  );
};

const CustomForm = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ fullName: '', phoneNumber: '', email: '', date: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="fullName" />
          <ErrorMessage name="fullName" component="div" />
          <Field type="tel" name="phoneNumber" />
          <ErrorMessage name="phoneNumber" component="div" />
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="number" name="ssn" />
          <ErrorMessage name="ssn" component="div" />
          <Field type="date" name="ssn" />
          <ErrorMessage name="birthday" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default CustomForm;
