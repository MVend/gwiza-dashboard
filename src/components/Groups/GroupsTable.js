import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Pagination,
  Spinner,
  Row,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { findAll, search } from "../../redux/actions/groupsActions";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NewGroup from "../Forms/NewGroup";
import Search from "../Forms/Search";
import { getLoggedUserInfo } from "../../utils/helpers";
import Uploader from "../Forms/Uploader";

const GroupsTable = ({ groups, findAllGroups, search }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [group, setGroup] = useState();
  const [searchHint, setSearchHint] = useState("");
  const { access_level } = getLoggedUserInfo();
  const {
    isLoading,
    values: { rows, totalItems, currentPage, totalPages },
  } = groups;

  const [paginater, setPaginater] = useState({
    page: 0,
    size: 10,
  });
  useEffect(() => {
    findAllGroups(paginater);
  }, []);

  useEffect(() => {
    findAllGroups(paginater);
  }, [paginater]);

  useEffect(() => {
    if (searchHint === "") return findAllGroups(paginater);
  }, [searchHint]);

  const handleEdit = (row) => {
    setIsEdit(true);
    setGroup(row);
  };

  const handleSearch = () => search({ ...paginater, searchHint });

  const isNotEmpty = !isLoading && totalItems < 1 ? false : true;

  const PaginationItems = [];
  if (totalPages > 0 && totalPages < 4) {
    for (let i = 0; i < totalPages; i++) {
      PaginationItems.push(
        <Pagination.Item
          key={i}
          onClick={() => setPaginater({ ...paginater, page: i })}
          disabled={currentPage === i ? true : false}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
  }
  if (totalPages > 0 && totalPages > 4) {
    for (let i = 0; i < 4; i++) {
      PaginationItems.push(
        <Pagination.Item
          onClick={() => setPaginater({ ...paginater, page: i })}
          disabled={currentPage === i ? true : false}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
  }

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>
              Groups
              <div className="float-right">
                {access_level === "2" && (
                  <>
                    <Uploader type="group" />
                    <NewGroup
                      group={group}
                      closeModal={() => setIsEdit(false)}
                      isEdit={isEdit}
                    />
                  </>
                )}
              </div>
            </Card.Header>
            <Search onType={setSearchHint} onSearch={handleSearch} />
            <Card.Body>
              <Table
                responsive
                striped={isNotEmpty}
                bordered={isNotEmpty}
                hover={isNotEmpty}
                size="sm"
              >
                <thead>
                  <tr>
                    <th>Group ID</th>
                    {access_level === "1" && <th>Organization</th>}
                    <th>Group Name</th>
                    <th>Group Code</th>
                    <th>Group Location</th>
                    <th>Meeting Time</th>
                    <th>Group status</th>
                    <th>Action</th>
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
                      <tr key={row.group_id}>
                        <td>{row.group_id}</td>

                        {access_level === "1" && (
                          <td>
                            {row.organization && row.organization.org_name}
                          </td>
                        )}
                        <td>{row.group_name}</td>
                        <td>{row.group_code}</td>
                        <td>
                          {row.location &&
                            ` ${row.location?.district_name} -
                              ${row.location?.sector_name}`}
                          {!row?.location &&
                            `${row?.district} -
                              ${row?.sector}`}
                        </td>
                        <td>
                          {row.day_of_meeting} {row.time_of_meeting}{" "}
                        </td>
                        <td>{row.group_status}</td>
                        <td>
                          <Link
                            className="pl-3 hover-icon"
                            to={`/groups/${row.group_id}`}
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </Link>

                          {access_level === "2" && (
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
              <Pagination className="float_right">
                <Pagination.Prev
                  disabled={currentPage === 0}
                  onClick={() =>
                    setPaginater({ ...paginater, page: paginater.page - 1 })
                  }
                />
                {PaginationItems.map((value) => value)}
                {totalPages > 4 && (
                  <>
                    {totalPages > 5 && <Pagination.Ellipsis />}
                    <Pagination.Item
                      onClick={() =>
                        setPaginater({ ...paginater, page: totalPages - 1 })
                      }
                      disabled={currentPage === totalPages - 1 ? true : false}
                    >
                      {totalPages}
                    </Pagination.Item>
                  </>
                )}
                <Pagination.Next
                  disabled={currentPage === totalPages - 1}
                  onClick={() =>
                    setPaginater({ ...paginater, page: paginater.page + 1 })
                  }
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapState = ({ groups }) => ({ groups });
export default connect(mapState, {
  findAllGroups: findAll,
  search,
})(GroupsTable);
