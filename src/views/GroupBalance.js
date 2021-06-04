import React, { useState } from 'react';
import { Input } from 'antd';
import Container from '../components/container';
import GroupsList from '../components/support/shared/GroupsList';
import Balance from '../components/support/balance/Balance';

const { Search } = Input;

const GroupBalance = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <Container
      pageTitle="Balances"
      extraHeaders={[
        <Search
          placeholder="Input search text"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />,
      ]}
    >
      <div className="row pl-5 pr-5">
        <div className="col-sm col-md col-lg-4">
          <GroupsList urlTarget="/support/balances" searchText={searchText} />
        </div>
        <div className="col-sm col-md col-lg">
          <Balance />
        </div>
      </div>
    </Container>
  );
};
export default GroupBalance;
