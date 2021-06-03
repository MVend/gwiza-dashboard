/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Statistic, Row, Col, Button, Layout, Result, message } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { supportAction } from '../../../redux/actions/supportAction';
import * as types from '../../../redux/types';

const { Content } = Layout;

const Balance = ({ fetchData, balances, groupBalances }) => {
  const { group_id } = useParams();
  const selectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));

  useEffect(() => {
    if (group_id) {
      fetchData('get', `/support/balances/${group_id}`, types.FETCH_SUPPORT_GROUP_BALANCES);
    }
  }, [group_id]);

  const loan = balances?.data?.find(({ wallet_type }) => wallet_type === 'loan');
  const share = balances?.data?.find(({ wallet_type }) => wallet_type === 'share');
  const availableBalance = +share?.wallet_account_balance + +loan?.wallet_account_balance;

  const updateBalanceHandler = () => {
    fetchData('put', `/support/balances/${group_id}`, types.UPDATE_GROUP_BALANCES, {
      availableBalance,
    });
  };
  useEffect(() => {
    if (+groupBalances?.data?.availableBalance === +availableBalance) {
      message.success('Balances updated');
    }
  }, [groupBalances]);

  return (
    <>
      {!group_id && (
        <Result icon={<WalletOutlined />} title="Balance of the selected Group will appear here" />
      )}
      {group_id && (
        <Content className="site-layout">
          <Row className="pl-5 pb-5">
            <Col className="col-sm col-md col-lg">
              {selectedGroup && (
                <h4>
                  {' '}
                  Group Balances - {selectedGroup?.group_name} [{selectedGroup?.group_code}]{' '}
                </h4>
              )}
            </Col>
          </Row>
          <Row className="pl-5 pb-5">
            <Col className="col-sm col-md col-lg-4">
              <Statistic
                title="Share Balance"
                precision={2}
                value={share?.wallet_account_balance}
                loading={balances?.isLoading}
              />
            </Col>
            <Col className="col-sm col-md col-lg-4">
              <Statistic
                title="Avalable Balance"
                precision={2}
                value={groupBalances?.data?.availableBalance || share?.wallet_available_balance}
                valueStyle={{
                  color:
                    +loan?.wallet_available_balance !== +availableBalance &&
                    !groupBalances?.data?.availableBalance
                      ? '#cf1322'
                      : undefined,
                }}
                loading={balances?.isLoading}
              />
            </Col>
          </Row>
          <Row className="pl-5 pb-5">
            <Col className="col-sm col-md col-lg-4">
              <Statistic
                title="Loan Balance"
                precision={2}
                value={loan?.wallet_account_balance}
                loading={balances?.isLoading}
              />
            </Col>
            <Col className="col-sm col-md col-lg-4">
              <Statistic
                title="Loan Available Balance"
                value={groupBalances?.data?.availableBalance || share?.wallet_available_balance}
                precision={2}
                valueStyle={{
                  color:
                    +loan?.wallet_available_balance !== +availableBalance &&
                    !groupBalances?.data?.availableBalance
                      ? '#cf1322'
                      : undefined,
                }}
                loading={balances?.isLoading}
              />
              {+loan?.wallet_available_balance !== +availableBalance &&
                !groupBalances?.data?.availableBalance && (
                  <Button
                    loading={groupBalances?.isLoading}
                    onClick={() => updateBalanceHandler()}
                    style={{ marginTop: 12 }}
                    type="primary"
                  >
                    Resolve
                  </Button>
                )}
            </Col>
          </Row>
        </Content>
      )}
    </>
  );
};

Balance.propTypes = {
  fetchData: PropTypes.func.isRequired,
  balances: PropTypes.any.isRequired,
  groupBalances: PropTypes.any.isRequired,
};

const mapState = ({ support }) => ({
  balances: support?.balances,
  groupBalances: support?.groupBalances,
});
export default connect(mapState, { fetchData: supportAction })(Balance);
