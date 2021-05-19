import React from 'react';
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const Requests = () => {
  const selectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Request Date', dataIndex: 'request_date', key: 'request_date' },
    { title: 'Phone Number', dataIndex: 'linked_msisdn', key: 'linked_msisdn' },
    { title: 'Amount Requested', dataIndex: 'amount_requested', key: 'amount_requested' },
    { title: 'Interest Rate', dataIndex: 'interest_rate', key: 'interest_rate' },
    { title: 'Payback Amount', dataIndex: 'payback_amount', key: 'payback_amount' },
    { title: 'Duration', dataIndex: 'loan_duration', key: 'loan_duration' },
    { title: 'No of Approvals', dataIndex: 'number_of_approvals', key: 'number_of_approvals' },
    { title: 'Status', dataIndex: 'request_status', key: 'request_status' },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      created: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  );
};

export default Requests;
