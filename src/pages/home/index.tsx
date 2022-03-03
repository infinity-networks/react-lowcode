import {
  Avatar,
  Card,
  Dropdown,
  Layout,
  Link,
  Menu,
  ResizeBox,
  Space,
} from '@arco-design/web-react';
import { IconGithub, IconNotification } from '@arco-design/web-react/icon';
import './App.less';

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;

export default function () {
  return (
    <Layout className="App">
      <Header className="header"></Header>
      <Layout>
        <Sider style={{ width: '64px' }}></Sider>
        <Sider
          resizeDirections={['right']}
          style={{ minWidth: 150, maxWidth: 500 }}
        ></Sider>
        <Layout>
          <Content
            style={{
              backgroundColor: '#F0F1F4',
              overflow: 'hidden',
              height: '100%',
            }}
          ></Content>
          <Sider></Sider>
        </Layout>
      </Layout>
    </Layout>
  );
}
