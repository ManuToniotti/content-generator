import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, Modal, Form, Input } from 'antd';
import { getTemplates, createTemplate } from '../services/api';

const { Title } = Typography;
const { TextArea } = Input;

const TemplateLibrary = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleCreateTemplate = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await createTemplate(values);
      setIsModalVisible(false);
      form.resetFields();
      fetchTemplates();
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

  return (
    <div>
      <Title level={2}>Template Library</Title>
      <Button type="primary" onClick={handleCreateTemplate} style={{ marginBottom: 16 }}>
        Create New Template
      </Button>
      <Row gutter={[16, 16]}>
        {templates.map((template) => (
          <Col span={8} key={template.id}>
            <Card title={template.name}>
              <p>{template.description}</p>
              <Button type="link">Use Template</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Create New Template"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Template Name"
            rules={[{ required: true, message: 'Please enter a template name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="content"
            label="Template Content"
            rules={[{ required: true, message: 'Please enter template content' }]}
          >
            <TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TemplateLibrary;