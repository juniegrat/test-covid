// LIBRARIES
import React, { Children } from 'react';
import { Modal, Select, Input } from 'antd';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  useField
} from 'formik';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
// COMPONENTS
import Box from 'common/components/Box';
import Text from 'common/components/Text';
//import Input from 'common/components/Input';
import CheckBox from 'common/components/Checkbox/index';
import Button from 'common/components/Button';
import CustomRadio from '../CustomRadio';
// UTILS
import localeStringOptions from 'common/utils/localeStringOptions';
import colors from 'common/theme/donation/colors.js';
import toDateTime from 'common/utils/secondToDate';
import { setDocument } from 'common/lib/firebase/firebase.util';
import { serverTimestamp } from 'common/lib/firebase/firebase';

const { Option } = Select;

const CustomField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  switch (props.inputType) {
    case 'checkbox': {
      return (
        <CheckBox
          {...field}
          {...props}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
      );
    }
    case 'select': {
      return (
        <Select
          {...field}
          {...props}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          style={{ width: 120, marginTop: 20 }}
          defaultActiveFirstOption={field.value}
        >
          {props.options?.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      );
    }
    default: {
      return (
        <Input
          {...field}
          {...props}
          //value={field.value}
          onChange={(val) => {
            setFieldValue(field.name, val.target.value);
          }}
        />
      );
    }
  }
};

const ResultForm = ({ result, isVisible, onOk, onCancel, ...props }) => {
  const [visible, setVisible] = React.useState(isVisible);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  React.useEffect(() => {
    if (isVisible !== visible) {
      setVisible(isVisible);
    }
    return;
  }, [isVisible]);

  const handleOk = (values) => {
    console.log(values);
    setConfirmLoading(true);
    onOk(values);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <FormWrapper>
      <Modal
        title={`${result?.fullName} le ${toDateTime(
          result?.createdAt.seconds
        ).toLocaleString('fr-FR', localeStringOptions)}`}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Enregistrer"
        cancelText="Annuler"
        //okButtonProps={{ disabled: !valid }}
        confirmLoading={confirmLoading}
      >
        <Formik
          initialValues={{
            testId: result?.id,
            result: result?.result
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
            handleOk(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <CustomField
                name="testId"
                inputType="text"
                label="Identifiant du test"
              />
              <ErrorMessage name="testId" component="div" />
              <CustomField
                name="result"
                inputType="select"
                label="Résultat du test"
                options={[
                  { value: 'positive', label: 'POSITIF' },
                  { value: 'negative', label: 'NÉGATIF' }
                ]}
              />
              <ErrorMessage name="result" component="div" />
              <Button disabled={isSubmitting} type="submit" />
            </Form>
          )}
        </Formik>
      </Modal>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  #identifiant_du_test,
  input {
    margin-bottom: 32px;
  }
  ul {
    background: 'transparent';
  }
  .ant-menu-submenu-arrow {
    display: 'none';
  }
`;

export default ResultForm;
