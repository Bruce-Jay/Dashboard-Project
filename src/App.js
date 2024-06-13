import React, { useState } from 'react';
import { Layout, Input, List, Button, Modal, Avatar, Badge, Row, Col } from 'antd';
import { SearchOutlined, BellOutlined } from '@ant-design/icons';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const { Header, Content } = Layout;

const initialProjects = [
  { name: 'Project A', users: 4, dashboards: 3, category: 'D' },
  { name: 'Project B', users: 2, dashboards: 4, category: 'C' },
  { name: 'Project C', users: 1, dashboards: 2, category: 'F' },
  { name: 'Project D', users: 3, dashboards: 2, category: 'D' }
];

const App = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const isLargeScreen = useMediaQuery('(min-width:768px)');
  
  /** Function to handle delete project, set project to delete and open modal. */ 
  const handleDelete = (project) => {
    setProjectToDelete(project);
    setIsModalVisible(true);
  };
  /** Function to confirm delete project, filter out the project to delete and close modal. */
  const confirmDelete = () => {
    setProjects(projects.filter(p => p.name !== projectToDelete.name));
    setIsModalVisible(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout className='layout'>
      <Header className='header'>
          <Badge>
            <BellOutlined className='headerBell' />
          </Badge>
          {isLargeScreen && <span className='headerName'>Sarah Green</span>}
          <Avatar className='headAvatar' />
      </Header>
      <Content className='content'>
        { isLargeScreen && (
          <div className='headerPC'></div>
        )}
        {
          !isLargeScreen && (
            <div className='headerMobile'>
              <div className='headerMobileName'>Hello Sarah!</div>
              <div className='headerComment'>Here you can find your projects and dashboards.</div>
            </div>
          )
        }
        <Input
          className={isLargeScreen ? 'searchInputPC' : 'searchInputMobile'}
          placeholder={ isLargeScreen ? "Search for a keyword" : "Search"}
          prefix={isLargeScreen && <SearchOutlined />}
          suffix={!isLargeScreen && <SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {
          !isLargeScreen && (
            <div className='projectHeader'>
              My Projects:
            </div>
          )
        }
        <List
          itemLayout="horizontal"
          dataSource={filteredProjects}
          renderItem={project => (
            <div className='listItem'>
              <div className='coloredBar'></div>
              <Row>
                <Col xs={6} md={2}>
                  <Avatar className='projectAvatar'>{project.category}</Avatar>
                </Col>
                <Col xs={18} md={8}>
                  <div className='projectName'>{project.name}</div>
                </Col>
                <Col xs={0} md={6}>
                  {project.users} users
                </Col>
                <Col xs={0} md={6}>
                  <span className='dashboardWrapper'>{project.dashboards} Dashboards</span> 
                </Col>
                <Col xs={0} md={2}>
                  <Button className='deleteButton' type="text" danger onClick={() => handleDelete(project)}>Delete</Button>
                </Col>
              </Row>
            </div>
          )}
        />
        <Modal
          title="Delete Project"
          open={isModalVisible}
          onOk={confirmDelete}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Are you sure you want to delete {projectToDelete?.name}?</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;

