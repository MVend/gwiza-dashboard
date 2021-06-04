import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { findAll } from '../../redux/actions/reasonsActions';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import NewReason from '../forms/NewReason';
import { getLoggedUserInfo } from '../../utils/helpers';

const Reasons = ({ reasons, findAll }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [reason, setReason] = useState();
  const { access_level } = getLoggedUserInfo();

  const [paginater, setPaginater] = useState({
    page: 0,
    size: 10,
  });
  const {
    isLoading,
    values: { rows, totalItems },
  } = reasons;
  const group = useParams();

  useEffect(() => {
    const data = {
      ...paginater,
      ...group,
    };
    findAll(data);
  }, []);

  const handleEdit = (row) => {
    setIsEdit(true);
    setReason(row);
  };

  const isFinesNotEmpty =
    !isLoading && rows.filter((val) => val.reason_type === 'fine') < 1 ? false : true;
  const isFundsNotEmpty =
    !isLoading && rows.filter((val) => val.reason_type === 'social fund') < 1 ? false : true;
  return (
    <>
      <Row>
        <Col>
          <div className="float-right mt-3">
            {access_level !== '3' && (
              <NewReason reason={reason} closeModal={() => setIsEdit(false)} isEdit={isEdit} />
            )}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6}>
          {' '}
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <h5>Fines reasons</h5>
                </Col>
              </Row>
              <Table
                responsive
                striped={isFinesNotEmpty}
                bordered={isFinesNotEmpty}
                hover={isFinesNotEmpty}
                size="sm"
              >
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <Spinner animation="border" />}

                  {!isFinesNotEmpty && (
                    <tr>
                      <td colSpan="3">
                        <div className="pt-5 no-data-text">
                          <span>No data found</span>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    totalItems > 0 &&
                    rows
                      .filter((val) => val.reason_type === 'fine')
                      .map((row) => (
                        <tr key={row.reason_id}>
                          <td>{row.reason_description}</td>
                          <td>{row.reason_amount}</td>
                          <td>
                            {access_level !== '3' && (
                              <Link
                                className="pl-3 hover-icon"
                                to="#"
                                onClick={() => handleEdit(row)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          {' '}
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <h5>Social fund reasons</h5>
                </Col>
              </Row>
              <Table
                responsive
                striped={isFundsNotEmpty}
                bordered={isFundsNotEmpty}
                hover={isFundsNotEmpty}
                size="sm"
              >
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <Spinner animation="border" />}

                  {!isFundsNotEmpty && (
                    <tr>
                      <td colSpan="3">
                        <div className="pt-5 no-data-text">
                          <span>No data found</span>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    totalItems > 0 &&
                    rows
                      .filter((val) => val.reason_type === 'social fund')
                      .map((row) => (
                        <tr key={row.reason_id}>
                          <td>{row.reason_description}</td>
                          <td>{row.reason_amount}</td>
                          <td>
                            <Link
                              className="pl-3 hover-icon"
                              to="#"
                              onClick={() => handleEdit(row)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapState = ({ reasons }) => ({ reasons });
export default connect(mapState, {
  findAll,
})(Reasons);
