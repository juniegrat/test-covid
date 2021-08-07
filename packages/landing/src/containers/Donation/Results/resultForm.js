// LIBRARIES
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Select, Input, Upload } from 'antd';
import { Form, ErrorMessage, useFormikContext, useField } from 'formik';
import styled from 'styled-components';
import CheckBox from 'common/components/Checkbox/index';
import Button from 'common/components/Button';
// UTILS
import localeStringOptions from 'common/utils/localeStringOptions';
import toDateTime from 'common/utils/secondToDate';
import { TypeOf } from 'yup';

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

const ResultForm = ({ test, isVisible, onCancel }) => {
  const [visible, setVisible] = useState(isVisible);
  const { submitForm, isSubmitting } = useFormikContext();

  useEffect(() => {
    if (isVisible !== visible) {
      setVisible(isVisible);
    }
    return;
  }, [isVisible]);

  const handleOk = (values) => {
    submitForm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <FormWrapper>
      <Modal
        title={`${test?.fullName} le ${
          typeof test?.createdAt === 'string'
            ? test?.createdAt
            : toDateTime(test?.createdAt?.seconds).toLocaleString(
                'fr-FR',
                localeStringOptions
              )
        }`}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Enregistrer"
        cancelText="Annuler"
        //okButtonProps={{ disabled: !valid }}
        confirmLoading={isSubmitting}
        destroyOnClose={true}
      >
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
          {/*  <CustomField
                name="document"
                inputType="upload"
                label="Document"
              />
              <ErrorMessage name="testId" component="div" /> */}
        </Form>
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

ResultForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired
};
