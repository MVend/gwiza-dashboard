/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { BackTop, Skeleton, Spin } from 'antd';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sharedAction } from '../../../redux/actions/sharedAction';
import * as types from '../../../redux/types';

const LogFile = ({ fetchLogs, logs, directory, fileName }) => {
  useEffect(() => {
    if (directory && fileName) {
      fetchLogs('get', `/support/logs/${directory}/${fileName}`, types.FETCH_USER_LOG_FILE);
    }
  }, [fileName]);

  let customizedLogs = logs?.file?.data?.data?.replace(/ /g, '\u00a0');
  customizedLogs = customizedLogs?.replace(/\n/g, '<br />');
  customizedLogs = customizedLogs?.replace(/\[LOG\sSTART\]/g, '<h5>LOG START </h5>');
  customizedLogs = customizedLogs?.replace(/\[LOG\sSTOP\]/g, '<h5>LOG STOP </h5><br/>');
  customizedLogs = customizedLogs?.replace(/\s\{"/g, '<br/>{');
  customizedLogs = customizedLogs?.replace(/http/g, '<br/>http');
  customizedLogs = customizedLogs?.replace(/Ikaze/g, '<br/>Ikaze');
  customizedLogs = customizedLogs?.replace(/":"/g, '":<br/>"');
  customizedLogs = customizedLogs?.replace(/"\}\s/g, '}<br/>');
  customizedLogs = customizedLogs?.replace(/\[/g, '<br/>[');
  customizedLogs = customizedLogs?.replace(/send\sRequest/g, '<b>send Request</b>');
  customizedLogs = customizedLogs?.replace(/response\scontent/g, '<b>response content</b>');

  return (
    <Container fluid>
      {logs?.file?.isLoading && (
        <>
          <Skeleton active />
          <Spin size="large" />
        </>
      )}
      {directory && fileName && customizedLogs?.includes('LOG START') && (
        <>
          <div className="wrap-long-text" dangerouslySetInnerHTML={{ __html: customizedLogs }} />
          <BackTop />
        </>
      )}
    </Container>
  );
};

const mapState = ({ logs }) => ({ logs });

LogFile.propTypes = {
  directory: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fetchLogs: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  logs: PropTypes.any.isRequired,
};

export default connect(mapState, { fetchLogs: sharedAction })(LogFile);
