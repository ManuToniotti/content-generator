import React, { useState } from 'react';
import { Typography, Card, Button, Input, message } from 'antd';
import ImageUploader from '../components/ImageUpload/ImageUploader';
import { generateImage } from '../services/api';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ImageGeneration = () => {
  const [uploadedImageDescription, setUploadedImageDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (result) => {
    setUploadedImageDescription(result.description);
    setPrompt(result.description); // Pre-fill the prompt with the image description
  };

  const handleGenerate = async () => {
    if (!prompt) {
      message.error('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateImage(prompt);
      setGeneratedImage(result.image);
      message.success('Image generated successfully!');
    } catch (error) {
      console.error('Error generating image:', error);
      message.error('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Image Generation</Title>
      <Card title="Upload Product Image" style={{ marginBottom: 16 }}>
        <ImageUploader onUpload={handleImageUpload} />
      </Card>
      {uploadedImageDescription && (
        <Card title="Image Description" style={{ marginBottom: 16 }}>
          <Paragraph>{uploadedImageDescription}</Paragraph>
        </Card>
      )}
      <Card title="Generate Image" style={{ marginBottom: 16 }}>
        <TextArea
          rows={4}
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleGenerate} loading={isLoading} disabled={!prompt}>
          Generate Image
        </Button>
      </Card>
      {generatedImage && (
        <Card title="Generated Image">
          <img src={generatedImage} alt="Generated" style={{ maxWidth: '100%' }} />
        </Card>
      )}
    </div>
  );
};

export default ImageGeneration;