import React from "react";
import { Layout, Menu, PageHeader } from 'antd';
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const { Header, Content, Footer } = Layout;
const Container = ({ children, pageTitle, extraHeaders }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <Layout className="layout">
      <Header>
        {/* <div className="logo"> Gwiza </div> */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item
            onClick={() =>history.push('/dashboard')}
            key="/dashboard">
              Dashboard
          </Menu.Item>
          <Menu.Item
            onClick={() =>history.push('/groups')} key="/groups">Groups</Menu.Item>
          <Menu.Item
            onClick={() =>history.push('/migration')} key="/migration">
              Migration
          </Menu.Item>
          <Menu.SubMenu title="Support">
            <Menu.Item onClick={() =>history.push('/support/logs')} key="/logs">Logs</Menu.Item>
            <Menu.Item
              onClick={() =>history.push('/support/balances')}
              key="/logs">Balances
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <PageHeader
          ghost
          onBack={() => history.goBack()}
          title={pageTitle || ''}
          extra={[
            ...extraHeaders || []
          ]}
        />
        <Layout className="site-layout">
          {children}
        </Layout>

      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Gwiza ©{moment().format('YYYY')} - Powered by MVend Ltd
      </Footer>
    </Layout>

  )
}
Container.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  pageTitle: PropTypes.string.isRequired,
  extraHeaders: PropTypes.arrayOf(PropTypes.element)
}
Container.defaultProps = {
  extraHeaders: []
};
export default Container;
