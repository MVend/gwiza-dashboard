import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { getLoggedUserInfo } from '../../utils/helpers';

const { SubMenu } = Menu;
const { Header } = Layout;

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const user = getLoggedUserInfo();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  const handleOnIdle = () => {
    localStorage.setItem(
      'loggedout',
      JSON.stringify({
        message: 'You are logged out due to the long time of inactivity',
        path: `${window.location.pathname}${window.location.search}`,
      }),
    );
    logout();
  };

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
  });

  return (
    <Header className="gwiza--header">
      <Menu
        theme="dark"
        className="gwiza--menu"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item onClick={() => history.push('/dashboard')} key="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/groups')} key="/groups">
          Groups
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/migration')} key="/migration">
          Migration
        </Menu.Item>
        <Menu.SubMenu title="Support">
          <Menu.Item onClick={() => history.push('/support/logs')} key="/support/logs">
            Logs
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/support/balances')} key="/support/balances">
            Balances
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push('/support/loan-requests')}
            key="/support/loan-requests"
          >
            Loan Requests
          </Menu.Item>
        </Menu.SubMenu>
        <SubMenu
          key="avatar"
          icon={<Avatar>{user?.name[0]}</Avatar>}
          title={` ${user?.name}`}
          className="gwiza--user"
        >
          <Menu.Item key="avatar:1" onClick={() => logout()}>
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};
Navbar.propTypes = {};
Navbar.defaultProps = {
  extraHeaders: [],
};
export default Navbar;
