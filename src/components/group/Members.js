import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { findAll, search } from '../../redux/actions/membersActions';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import NewMember from '../forms/NewMember';
import Search from '../forms/Search';
import { getLoggedUserInfo } from '../../utils/helpers';
import Uploader from '../forms/Uploader';

const Members = ({ members, findAll, search }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [member, setMember] = useState();
  const [searchHint, setSearchHint] = useState('');
  const { access_level } = getLoggedUserInfo();
  const [paginater, setPaginater] = useState({
    page: 0,
    size: 1000,
  });
  const {
    isLoading,
    values: { rows, totalItems },
  } = members;
  const group = useParams();

  const data = {
    ...paginater,
    ...group,
  };

  useEffect(() => {
    findAll(data);
  }, []);

  useEffect(() => {
    if (searchHint === '') return findAll(data);
  }, [searchHint]);

  const handleEdit = (row) => {
    setIsEdit(true);
    setMember(row);
  };

  const handleSearch = () => search({ ...data, searchHint });

  const isNotEmpty = !isLoading && totalItems < 1 ? false : true;

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
                      <div className="float-right">
                        {access_level === '2' && (
                          <>
                            <Uploader type="members" />
                            <NewMember
                              member={member}
                              closeModal={() => setIsEdit(false)}
                              isEdit={isEdit}
                            />
                          </>
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Search onType={setSearchHint} onSearch={handleSearch} />
            <Table
              responsive
              striped={isNotEmpty}
              bordered={isNotEmpty}
              hover={isNotEmpty}
              size="sm"
            >
              <thead>
                <tr>
                  <th>Member Number</th>
                  <th>Name</th>
                  <th>National ID</th>
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
                    <tr key={row.member_id}>
                      <td>{row.member_number}</td>
                      <td>
                        {row.first_name} {row.last_name}
                      </td>
                      <td>{row.nid}</td>
                      <td>{row.phone_number}</td>
                      {access_level === '2' && (
                        <td>
                          <Link className="pl-3 hover-icon" to="#" onClick={() => handleEdit(row)}>
                            <FontAwesomeIcon icon={faEdit} />
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

const mapState = ({ members }) => ({ members });
export default connect(mapState, {
  findAll,
  search,
})(Members);
