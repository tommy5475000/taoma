
import React from 'react';
import { Layout, Menu, Col, Row, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { items } from '../ItemHeader/item';


import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const App = () => {

  const navigate = useNavigate()
  //----- chọn menu nào để mở -----
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      navigate("/PageDm")
    } else if (e.key === '2') {
      navigate("/PageNcc")
    } else if (e.key === '3') {
      navigate("/NhomNH")
    }
  };
  //----- chọn menu nào để mở -----

  return (
    <Layout>
      <Header>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" span={6}>
            <a href="http://localhost:3000/">
              <img src="https://benthanhtsc.com/wp-content/uploads/2019/11/logo01.svg" alt="logo" style={{ width: 190, padding: 5, backgroundColor: "white" }} />
            </a>
          </Col>

          <Col className="gutter-row" span={12}>
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              onClick={handleMenuClick}
              style={{
                flex: 1,
                minWidth: 0,
              }} />
          </Col>

          <Col className="gutter-row" span={6}>
            <Button type="primary" shape="round" icon={<UserOutlined />}>
            </Button>
          </Col>
        </Row>
      </Header>

      <Content
        style={{
          padding: '10px',
        }}
      >
      </Content>

    </Layout>
  );
};
export default App;