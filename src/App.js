import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import ImageGeneration from './pages/ImageGeneration';
import VideoCreation from './pages/VideoCreation';
import ContentManagement from './pages/ContentManagement';
import TemplateLibrary from './pages/TemplateLibrary';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/image-generation" element={<ImageGeneration />} />
                <Route path="/video-creation" element={<VideoCreation />} />
                <Route path="/content-management" element={<ContentManagement />} />
                <Route path="/template-library" element={<TemplateLibrary />} />
              </Routes>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;