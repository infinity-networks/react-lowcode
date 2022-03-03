import {
  Avatar,
  Card,
  Divider,
  Dropdown,
  Input,
  Layout,
  Link,
  Menu,
  PageHeader,
  ResizeBox,
  Space,
  Typography,
} from '@arco-design/web-react';
import {
  IconGithub,
  IconNotification,
  IconSearch,
} from '@arco-design/web-react/icon';
import './App.less';

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;

const MenuItem = Menu.Item;

const { Title } = Typography;

export default function () {
  return (
    <Layout className="App">
      <Layout>
        <Sider style={{ width: 200, padding: 8 }}>
          <Menu
            style={{ width: '100%' }}
            defaultOpenKeys={['0']}
            defaultSelectedKeys={['0_2']}
          >
            <MenuItem key="0_0">主页</MenuItem>
            <MenuItem key="0_1">草稿箱</MenuItem>
            <MenuItem key="0_2">分享给我的</MenuItem>
            <MenuItem key="0_3">回收站</MenuItem>
            <Divider />
          </Menu>
        </Sider>
        <Layout>
          <Layout style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            <Header style={{ height: '64px', paddingTop: '16px' }}>
              <Input.Search
                allowClear
                placeholder="搜索"
                style={{ borderRadius: '16' }}
              />
            </Header>
            <Content>
              <div style={{ display: 'flex' }}>
                <Typography>
                  <Title heading={4}>主页</Title>
                </Typography>
              </div>
            </Content>
          </Layout>
          <Sider>Sider</Sider>
        </Layout>
      </Layout>
    </Layout>
  );
}
