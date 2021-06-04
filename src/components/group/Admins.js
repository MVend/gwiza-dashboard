import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { findAll, remove } from '../../redux/actions/adminsActions';
import NewAdmin from '../forms/NewAdmin';
import { getLoggedUserInfo } from '../../utils/helpers';

const Admins = ({ admins, findAll, remove }) => {
  const { access_level } = getLoggedUserInfo();
  const [paginater, setPaginater] = useState({
    page: 0,
    size: 1000,
  });
  const {
    isLoading,
    values: { rows, totalItems },
  } = admins;
  const group = useParams();

  const data = {
    ...paginater,
    ...group,
  };

  useEffect(() => {
    findAll(data);
  }, []);

  const deleteAdmin = (admin_id) => {
    const confirmed = window.confirm('Are you sure? This cannot be undone');
    if (confirmed) return remove(admin_id);
  };

  const isNotEmpty = !(!isLoading && totalItems < 1);

  return (
    <Row className="mt-3">
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Form lg="3" className="float-right">
                  <Form.Group as={Row}>
                    <Col>
                      <div className="float-right">{access_level === '2' && <NewAdmin />}</div>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Table
              responsive
              striped={isNotEmpty}
              bordered={isNotEmpty}
              hover={isNotEmpty}
              size="sm"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone number</th>
                  {access_level === '2' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {isLoading && <Spinner animation="border" />}
                {!isNotEmpty && (
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
                  rows.map((row) => (
                    <tr key={row.id}>
                      <td>{/* {row.user.first_name} {row.user.last_name} */}</td>
                      <td>{row.phone_number}</td>
                      {access_level === '2' && (
                        <td>
                          <Link
                            className="pl-3 hover-icon"
                            to="#"
                            onClick={() => deleteAdmin(row.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const mapState = ({ admins }) => ({ admins });
export default connect(mapState, {
  findAll,
  remove,
})(Admins);
