import {
  HeartOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router';

const AppLayout = ({ children }) => {
  const history = useHistory();
  const { Title } = Typography;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          paddingTop: '16px',
          overflowY: 'auto',
        }}
      >
        <Title
          level={4}
          style={{
            textAlign: 'center',
            borderBottom: '1px solid #D3D3D3',
            paddingBottom: '16px',
          }}
        >
          Low Cost Instragram
        </Title>
        <div style={{ padding: '0 16px', height: '100%' }}>{children}</div>
      </div>

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: '16px',
          paddingTop: '16px',
          boxShadow: '0px -3px 13px 1px rgba(166,166,166,0.42)',
        }}
      >
        <Button
          type="link"
          size="large"
          icon={<HomeOutlined />}
          style={{ color: 'black' }}
        />
        <Button
          type="link"
          size="large"
          icon={<SearchOutlined />}
          style={{ color: 'black' }}
        />
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => history.push('/post-images')}
          style={{
            background: 'linear-gradient(to bottom, #d82b7e, #f57939)',
            borderColor: '#d82b7e',
          }}
        />
        <Button
          type="link"
          size="large"
          icon={<HeartOutlined />}
          style={{ color: 'black' }}
        />
        <Avatar icon={<UserOutlined />} size={22} />
      </div>
    </div>
  );
};

const AppLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AppLayout>
          <Component {...matchProps} />
        </AppLayout>
      )}
    />
  );
};

export default AppLayoutRoute;
