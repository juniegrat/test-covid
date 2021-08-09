// LIBRARIES
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Select, Input, Upload } from 'antd';
import { Form, ErrorMessage, useFormikContext, useField } from 'formik';
import styled from 'styled-components';
// UTILS
import localeStringOptions from 'common/utils/localeStringOptions';
import toDateTime from 'common/utils/secondToDate';
import colors from 'common/theme/donation/colors.js';
import { TypeOf } from 'yup';
// COMPONENTS
import CheckBox from 'common/components/Checkbox/index';
import Button from 'common/components/Button';
import Text from '../../../common/components/Text';

const { Option } = Select;

const CustomField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  switch (props.inputType) {
    case 'checkbox': {
      return (
        <InputWrapper>
          <Text as={'label'} htmlFor={field.name} content={props.label} />
          <CheckBox
            {...field}
            {...props}
            id={field.name}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
          <ErrorMessage
            name={field.name}
            component="div"
            className={'error-message'}
          />
        </InputWrapper>
      );
    }
    case 'select': {
      return (
        <InputWrapper>
          <Text
            as={'label'}
            htmlFor={field.name}
            content={props.label}
            mb={0}
          />
          <Select
            {...field}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
            style={{ width: 120 }}
            defaultActiveFirstOption={field.value}
            id={field.name}
          >
            {props.options?.map((option, index) => (
              <Option key={index} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          <ErrorMessage
            name={field.name}
            component="div"
            className={'error-message'}
          />
        </InputWrapper>
      );
    }
    case 'upload': {
      const [documentFile, setDocumentFile] = useState([
        !props.document && {
          uid: '-1',
          name: 'Document',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ]);
      return (
        <UploadWrapper>
          <Upload
            listType="file"
            defaultFileList={documentFile === [] ? [...documentFile] : []}
            id={field.name}
            onChange={({ file, fileList }) => {
              if (file.status !== 'uploading') {
                setDocumentFile([file]);
                setFieldValue(field.name, file.originFileObj);
              }
              if (file.status === 'removed') {
                setFieldValue(field.name, null);
                setDocumentFile([]);
              }
            }}
            maxCount={1}
          >
            <Button type="button" title="Ajouter document" colors={'primary'} />{' '}
            <Text as={'label'} content={'(Max: 1)'} />
          </Upload>
          <ErrorMessage
            name={field.name}
            component="div"
            className={'error-message'}
          />
        </UploadWrapper>
      );
    }
    default: {
      return (
        <InputWrapper>
          <Text as={'label'} htmlFor={field.name} content={props.label} />
          <Input
            {...field}
            {...props}
            id={field.name}
            //value={field.value}
            onChange={(val) => {
              setFieldValue(field.name, val.target.value);
            }}
          />
          <ErrorMessage
            name={field.name}
            component="div"
            className={'error-message'}
          />
        </InputWrapper>
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
          <CustomField
            name="result"
            inputType="select"
            label="Résultat du test"
            options={[
              { value: 'positive', label: 'POSITIF' },
              { value: 'negative', label: 'NÉGATIF' }
            ]}
          />
          <CustomField name="document" inputType="upload" label="Document" />
        </Form>
      </Modal>
    </FormWrapper>
  );
};

const FormWrapper = styled.div``;

const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 2px;
  }
  & > .error-message {
    color: ${colors.secondaryHover};
  }
`;

const UploadWrapper = styled.div`
  margin-top: 8px;
  .upload-list-inline {
  }
  .ant-upload-select-picture span {
    display: flex;
    align-items: center;
    & > label {
      margin-left: 8px;
      margin-bottom: 0px;
    }
  }
`;

export default ResultForm;

ResultForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired
};
