import React, { useEffect } from "react";
import { Card, Col, Form, Row, Spinner, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { findOne } from "../../redux/actions/groupsActions";
import {
  findAll as findAllApprovals,
  create,
} from "../../redux/actions/approvalsActions";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getLoggedUserInfo } from "../../utils/helpers";

const Details = ({
  groups,
  findOne,
  findAllApprovals,
  approvals: {
    btnLoading,
    values: { rows, totalItems },
  },
  create,
}) => {
  const {
    detailsLoading,
    oneGroup: { members, reasons, ...group },
  } = groups;
  const group_id = useParams();
  const { id: user_id, access_level } = getLoggedUserInfo();

  useEffect(() => {
    findOne(group_id);
    findAllApprovals({ ...group_id });
  }, []);

  const approve = () => create(group_id);

  const youApproved =
    totalItems > 0 && rows.find((r) => r.user_id === user_id) ? true : false;

  return (
    <Row className="mt-3">
      <Col>
        <Row>
          <Col lg="12">
            <Card className="mb-5">
              <Card.Header>
                Group information
                {+access_level === 1 && (
                  <div className="float-right">
                    <Button size="sm" onClick={approve}>
                      {!youApproved && `Approve`}
                      {youApproved && `Dis-approve`}
                      {btnLoading && <Spinner animation="border" />}
                    </Button>
                  </div>
                )}
              </Card.Header>
              <Card.Body>
                {detailsLoading && <Spinner animation="border" />}
                {!detailsLoading && (
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            <strong>Name:</strong>
                          </Form.Label>
                          {group.group_name}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>
                            <strong>Group ID:</strong>
                          </Form.Label>
                          {group.group_id}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            <strong>Group Code:</strong>
                          </Form.Label>
                          {group.group_code}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            <strong>Status:</strong>
                          </Form.Label>
                          {group.group_status &&
                            group.group_status.toUpperCase()}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            <strong>Created at:</strong>
                          </Form.Label>
                          {moment(group.date_created).format("DD MMM, YYYY")}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>
                            <strong>Meeting Time:</strong>
                          </Form.Label>
                          {group.day_of_meeting} {group.time_of_meeting}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            <strong>Location:</strong>
                          </Form.Label>
                          {group.location &&
                            `${group.location.district_name} - ${group.location.sector_name}`}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            <strong>Approvals:</strong>
                          </Form.Label>
                          {totalItems}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            <strong>Share value:</strong>
                          </Form.Label>
                          {group.share_value}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            <strong>Social fund amount:</strong>
                          </Form.Label>
                          {group.socialfund_amount}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>
                            <strong>Max Weekly Share:</strong>
                          </Form.Label>
                          {group.max_weekly_shares}
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group>
                          <Form.Label>
                            <strong>Interest rate:</strong>
                          </Form.Label>
                          {group.interest_rate}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>
                            <strong>Max loan duration:</strong>
                          </Form.Label>
                          {group.max_loan_duration}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>
                            <strong>Loan ratio:</strong>
                          </Form.Label>
                          {group.loan_to_savings_ratio}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapState = ({ groups, approvals }) => ({ groups, approvals });
export default connect(mapState, {
  findOne,
  findAllApprovals,
  create,
})(Details);
