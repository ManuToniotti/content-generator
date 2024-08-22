import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadAndDescribeImage } from '../../services/api';

const { Dragger } = Upload;

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const result = await uploadAndDescribeImage(formData);
      message.success(`${file.name} file uploaded and described successfully.`);
      onSuccess(result, file);
      onUpload(result);  // Pass the result (including description) to the parent component
    } catch (error) {
      console.error('Upload failed:', error);
      message.error(`${file.name} file upload failed.`);
      onError(error);
    } finally {
      setUploading(false);
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: handleUpload,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single upload. The image will be automatically described after uploading.
      </p>
    </Dragger>
  );
};

export default ImageUploader;