import React, { useState } from 'react';
import { Typography, Card, Button, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { convertToVideo } from '../services/api';

const { Title } = Typography;
const { TextArea } = Input;

const VideoCreation = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleImageSelect = (info) => {
    if (info.file.status === 'done') {
      setSelectedImage(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleConvert = async () => {
    try {
      const result = await convertToVideo(selectedImage, prompt);
      setGeneratedVideo(result.video);
      message.success('Video generated successfully!');
    } catch (error) {
      message.error('Failed to generate video. Please try again.');
    }
  };

  return (
    <div>
      <Title level={2}>Video Creation</Title>
      <Card title="Select Image" style={{ marginBottom: 16 }}>
        <Upload
          accept="image/*"
          onChange={handleImageSelect}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Card>
      <Card title="Generate Video" style={{ marginBottom: 16 }}>
        <TextArea
          rows={4}
          placeholder="Enter your prompt for video creation"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleConvert} disabled={!selectedImage || !prompt}>
          Convert to Video
        </Button>
      </Card>
      {generatedVideo && (
        <Card title="Generated Video">
          <video controls src={generatedVideo} style={{ maxWidth: '100%' }} />
        </Card>
      )}
    </div>
  );
};

export default VideoCreation;