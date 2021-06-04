import React, { useState } from 'react';
import { Input } from 'antd';
import Container from '../components/container';
import GroupsList from '../components/support/shared/GroupsList';
import Requests from '../components/support/loan/requests';

const { Search } = Input;

const LoanRequests = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <Container
      pageTitle="Loan Requests"
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
          <GroupsList urlTarget="/support/loan-requests" searchText={searchText} />
        </div>
        <div className="col-sm col-md col-lg">
          <Requests />
        </div>
      </div>
    </Container>
  );
};
export default LoanRequests;
