// LIBRARIES
import React, { useState, useEffect } from 'react';
import { Modal, Select, Input, Upload } from 'antd';
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
    case 'upload': {
      return (
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          //defaultFileList={[...fileList]}
          className="upload-list-inline"
          onChange={({ file, fileList }) => {
            if (file.status !== 'uploading') {
              console.log(file, fileList);
            }
          }}
        >
          <Button type="button" title="Ajouter document" colors={'secondary'} />
        </Upload>
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
  const [visible, setVisible] = useState(isVisible);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (isVisible !== visible) {
      setVisible(isVisible);
    }
    return;
  }, [isVisible]);

  const handleOk = (values) => {
    const { submitForm } = useFormikContext();
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
        destroyOnClose={true}
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
            <Form className={'result-form'}>
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
              <CustomField
                name="document"
                inputType="upload"
                label="Document"
              />
              <ErrorMessage name="testId" component="div" />
              <Button disabled={isSubmitting} type="submit" title="envoyer" />
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
