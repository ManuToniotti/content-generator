import React, { useState } from 'react';
import { Upload, message, Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadImages } from '../../services/api';

const { Dragger } = Upload;

const ImageUploader = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [superProductPrompt, setSuperProductPrompt] = useState('');

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const result = await uploadImages(formData);
      message.success(`${file.name} file uploaded and analyzed successfully.`);
      setAnalysisResults(prevResults => [...(prevResults || []), ...result.analysisResults]);
      setSuperProductPrompt(result.superProductPrompt);
      onSuccess(result, file);
    } catch (error) {
      console.error('Upload failed:', error);
      message.error(`${file.name} file upload failed.`);
      onError(error);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onUpload) {
      onUpload(newFileList);
    }
  };

  const props = {
    name: 'images',
    multiple: true,
    fileList,
    customRequest: handleUpload,
    onChange: handleChange,
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag files to this area to upload</p>
        <p className="ant-upload-hint">
          Support for multiple file upload. Images will be analyzed to create a detailed product description.
        </p>
      </Dragger>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {fileList.map(file => (
          <Col key={file.uid} xs={24} sm={12} md={8} lg={6}>
            <img
              src={file.thumbUrl || URL.createObjectURL(file.originFileObj)}
              alt={file.name}
              style={{ width: '100%', height: '100px', objectFit: 'cover' }}
            />
          </Col>
        ))}
      </Row>
      {analysisResults && (
        <Card title="Image Analysis Results" style={{ marginTop: '20px' }}>
          {analysisResults.map((result, index) => (
            <div key={index}>
              <p><strong>{result.filename}:</strong></p>
              <p>Dimensions: {result.width}x{result.height}</p>
              <p>Format: {result.format}</p>
              <p>Dominant Color: {result.dominantColor}</p>
              <p>Texture: {result.texture}</p>
              <p>Edge Count: {result.edgeCount}</p>
              <p>Feature Count: {result.featureCount}</p>
            </div>
          ))}
        </Card>
      )}
      {superProductPrompt && (
        <Card title="Super Product Prompt" style={{ marginTop: '20px' }}>
          <p>{superProductPrompt}</p>
        </Card>
      )}
    </>
  );
};

export default ImageUploader;
