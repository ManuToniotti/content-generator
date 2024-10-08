import React, { useState } from 'react';
import { Upload, message, Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadImages } from '../../services/api';

const { Dragger } = Upload;

const ImageUploader = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [aggregatedAnalysis, setAggregatedAnalysis] = useState(null);
  const [detailedPrompt, setDetailedPrompt] = useState('');

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const result = await uploadImages(formData);
      message.success(`${file.name} file uploaded and analyzed successfully.`);
      setAggregatedAnalysis(result.aggregatedAnalysis);
      setDetailedPrompt(result.detailedPrompt);
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
      {aggregatedAnalysis && (
        <Card title="Aggregated Image Analysis Results" style={{ marginTop: '20px' }}>
          <p><strong>Object Type:</strong> {aggregatedAnalysis.objectType.join(', ')}</p>
          <p><strong>Colors:</strong> {aggregatedAnalysis.colors.join(', ')}</p>
          <p><strong>Textures:</strong> {aggregatedAnalysis.textures.join(', ')}</p>
          <p><strong>Materials:</strong> {aggregatedAnalysis.materials.join(', ')}</p>
          <p><strong>Features:</strong> {aggregatedAnalysis.features.join(', ')}</p>
          <p><strong>Labels:</strong> {aggregatedAnalysis.labels.join(', ')}</p>
          {aggregatedAnalysis.logos.length > 0 && (
            <p><strong>Logos:</strong> {aggregatedAnalysis.logos.join(', ')}</p>
          )}
          {aggregatedAnalysis.text.length > 0 && (
            <p><strong>Text:</strong> {aggregatedAnalysis.text.join(' ')}</p>
          )}
        </Card>
      )}
      {detailedPrompt && (
        <Card title="Detailed Product Description" style={{ marginTop: '20px' }}>
          <p>{detailedPrompt}</p>
        </Card>
      )}
    </>
  );
};

export default ImageUploader;