import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { PictureOutlined, VideoCameraOutlined, ScheduleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Images Generated"
              value={11}
              prefix={<PictureOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Videos Created"
              value={5}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Scheduled Posts"
              value={8}
              prefix={<ScheduleOutlined />}
            />
          </Card>
        </Col>
      </Row>
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard;