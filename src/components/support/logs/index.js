import React, { useEffect, useState } from 'react';
import { Button, Layout, Input, Table, Space, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';
import { sharedAction } from '../../../redux/actions/sharedAction';
import * as types from '../../../redux/types';
import Container from '../../container';
import LogFile from './LogFile';

const { Sider } = Layout;

const SupportLayout = ({ fetchLogs, logs }) => {
  const [logsDate, setLogsDate] = useState(new Date());
  const selectedDate = logsDate !== null ? logsDate : new Date();
  const directory = moment(selectedDate).format('YYYY_MM_DD');
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const dataSource = logs?.logs?.data?.data?.length
    ? logs?.logs?.data?.data?.filter((log) => log?.name?.includes(searchText.toLowerCase()))
    : [];

  useEffect(() => {
    setSearchText('');
    setSelectedFile('');
    fetchLogs('get', `/support/logs/${directory}`, types.FETCH_LOGS);
  }, [logsDate]);

  const handleSearch = (selectedKey) => setSearchText(selectedKey);

  const disabledDate = (current) => current && current > moment().endOf('day');

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
        textToHighlight={text?.toString()?.split('_')[5]?.substr(0, 12)}
      />
    ),
  });

  const columns = [
    {
      title: `Logs of the ${moment(selectedDate).format('Do MMMM, YYYY')}`,
      dataIndex: 'name',
      key: 'key',
      ...getColumnSearchProps(),
    },
  ];

  return (
    <Container
      pageTitle="Logs"
      extraHeaders={[<DatePicker disabledDate={disabledDate} onChange={setLogsDate} />]}
    >
      <Sider className="site-layout-background ml-4">
        <Table
          loading={logs?.logs?.isLoading}
          dataSource={dataSource}
          columns={columns}
          onRow={(record) => ({
            onDoubleClick: () => setSelectedFile(record?.name),
          })}
        />
      </Sider>
      <LogFile directory={directory} fileName={selectedFile} />
    </Container>
  );
};

SupportLayout.propTypes = {
  fetchLogs: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  logs: PropTypes.any.isRequired,
};
const mapState = ({ logs }) => ({ logs });
export default connect(mapState, { fetchLogs: sharedAction })(SupportLayout);
