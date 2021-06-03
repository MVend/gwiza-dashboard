import React, { useEffect } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { supportAction } from '../../../redux/actions/supportAction';
import * as types from '../../../redux/types';

const GroupsList = ({ searchText, fetchData, groups, urlTarget }) => {
  const dataSource = groups?.data?.length
    ? groups?.data?.filter(
        (row) =>
          row?.group_name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
          row?.group_code?.toString()?.includes(searchText?.toLowerCase()),
      )
    : [];

  useEffect(() => {
    fetchData('get', '/support/groups', types.FETCH_SUPPORT_GROUPS);
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      loading={groups?.isLoading}
      pagination={dataSource?.length > 10}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar>{item.group_name[0]}</Avatar>}
            title={
              <Link
                onClick={() => localStorage.setItem('selectedGroup', JSON.stringify(item))}
                to={`${urlTarget}/${item?.group_id}`}
              >
                {item?.group_name}
              </Link>
            }
            description={item?.group_code}
          />
        </List.Item>
      )}
    />
  );
};

GroupsList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  groups: PropTypes.any.isRequired,
  searchText: PropTypes.string.isRequired,
  urlTarget: PropTypes.string.isRequired,
};
const mapState = ({ support }) => ({ groups: support?.groups });
export default connect(mapState, { fetchData: supportAction })(GroupsList);
