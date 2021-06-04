/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { sharedAction } from '../../../redux/actions/sharedAction';
import * as types from '../../../redux/types';

const Requests = () => {
  const dispatch = useDispatch();
  const requestsResponse = useSelector((state) => state?.support?.loanRequests);
  const { group_id } = useParams();
  const selectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));
  const [searchText, setSearchText] = useState('');
  const requests = requestsResponse?.data?.data?.map((req) => ({
    ...req,
    request_date: moment(req?.request_date).format('YYYY-MM-DD HH:mm'),
    key: req?.request_id,
    amount_requested: Intl.NumberFormat('en-US').format(req?.amount_requested),
    interest_rate: Intl.NumberFormat('en-US').format(req?.interest_rate),
    payback_amount: Intl.NumberFormat('en-US').format(req?.payback_amount),
  }));
  const dataSource = requests?.length
    ? requests?.filter((req) => req?.linked_msisdn?.toString()?.includes(searchText.toLowerCase()))
    : [];

  useEffect(() => {
    setSearchText('');
    if (group_id) {
      dispatch(
        sharedAction('get', `/support/loan/requests/${group_id}`, types.FETCH_GROUP_LOAN_REQUESTS),
      );
    }
  }, [group_id]);

  const handleSearch = (selectedKey) => setSearchText(selectedKey);

  const getColumnSearchProps = () => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => {
              confirm();
              setSearchText('');
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        // eslint-disable-next-line react/destructuring-assignment
        textToHighlight={text?.toString()}
      />
    ),
  });

  const expandedRowRender = (approvals) => {
    const columns = [
      { title: 'Admin Phone', dataIndex: 'approving_msisdn', key: 'approving_msisdn' },
      {
        title: 'Approved At',
        dataIndex: 'approval_date',
        key: 'approval_date',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: 'Status',
        dataIndex: 'approval_status',
        key: 'approval_status',
        render: () => (
          <span>
            <Badge status="success" />
            Approved
          </span>
        ),
      },
    ];
    return <Table columns={columns} dataSource={approvals} pagination={false} />;
  };

  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'linked_msisdn',
      key: 'linked_msisdn',
      ...getColumnSearchProps(),
    },
    { title: 'Request Date', dataIndex: 'request_date', key: 'request_date' },
    { title: 'Amount Requested', dataIndex: 'amount_requested', key: 'amount_requested' },
    {
      title: 'Interest Rate',
      dataIndex: 'interest_rate',
      key: 'interest_rate',
      responsive: ['lg'],
    },
    {
      title: 'Payback Amount',
      dataIndex: 'payback_amount',
      key: 'payback_amount',
      responsive: ['lg'],
    },
    { title: 'Duration', dataIndex: 'loan_duration', key: 'loan_duration', responsive: ['lg'] },
    { title: 'No of Approvals', dataIndex: 'number_of_approvals', key: 'number_of_approvals' },
    {
      title: 'Status',
      dataIndex: 'request_status',
      key: 'request_status',
      render: (text) => (
        <span>
          <Badge
            status={
              text === 'approved'
                ? 'success'
                : text === 'applied'
                ? 'processing'
                : text === 'cancelled'
                ? 'default'
                : 'error'
            }
          />
          {text[0]?.toUpperCase() + text?.slice(1, text?.length)}
        </span>
      ),
    },
  ];

  return (
    <Table
      className="components-table-demo-nested"
      title={() => (
        <h4>
          {selectedGroup?.group_name} [{selectedGroup?.group_code}]
        </h4>
      )}
      loading={requestsResponse?.isLoading}
      columns={columns}
      expandable={{ expandedRowRender: (record) => expandedRowRender(record?.approvals) }}
      dataSource={dataSource}
    />
  );
};

export default Requests;
