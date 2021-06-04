import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

const { Header } = Layout;
const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
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
      </Menu>
    </Header>
  );
};
Navbar.propTypes = {};
Navbar.defaultProps = {
  extraHeaders: [],
};
export default Navbar;
