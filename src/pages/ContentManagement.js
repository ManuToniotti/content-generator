import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { getContents, scheduleContent } from '../services/api';

const { Title } = Typography;

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const data = await getContents();
      setContents(data);
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    }
  };

  const handleSchedule = (content) => {
    setSelectedContent(content);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await scheduleContent(selectedContent.id, values.scheduledDate, values.platform);
      setIsModalVisible(false);
      fetchContents();
    } catch (error) {
      console.error('Failed to schedule content:', error);
    }
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleSchedule(record)}>Schedule</Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Content Management</Title>
      <Table dataSource={contents} columns={columns} rowKey="id" />
      <Modal
        title="Schedule Content"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="scheduledDate"
            label="Scheduled Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: 'Please enter a platform' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;