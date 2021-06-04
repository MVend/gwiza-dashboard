import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button, Spinner, Toast } from "react-bootstrap";
import moment from "moment";
import { connect } from "react-redux";
import { findAll, createComment } from "../../redux/actions/commentsActions";
import { useParams } from "react-router-dom";
import { getLoggedUserInfo } from "../../utils/helpers";

const Comments = ({ comments, findAll, createComment }) => {
  const [comment, setComment] = useState("");
  const { id: user_id } = getLoggedUserInfo();
  const [paginater, setPaginater] = useState({
    page: 0,
    size: 1000,
  });
  const {
    btnLoading,
    values: { rows },
  } = comments;
  const group = useParams();

  const data = {
    ...paginater,
    ...group,
  };

  useEffect(() => {
    findAll(data);
  }, []);

  const saveComment = () => {
    const data = {
      user_id,
      comment,
      ...group,
    };
    createComment(data);
    setComment("");
  };

  return (
    <Row className="mt-3">
      <Col>
        {" "}
        <Card>
          <Card.Body>
            <Col lg={4}>
              {rows.map((row) => (
                <Toast
                  className={row.user_id === user_id ? "semi-dark" : ""}
                  key={row.id}
                >
                  <Toast.Header closeButton={false}>
                    <strong className="mr-auto">
                      {row.user_id === user_id ? "You" : row.sender.name}
                    </strong>
                    <small>{moment(row.createdAt).fromNow()}</small>
                  </Toast.Header>
                  <Toast.Body>{row.comment}</Toast.Body>
                </Toast>
              ))}
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                />
              </Form.Group>
              <Button size="sm" className="float_right" onClick={saveComment}>
                Send {btnLoading ? <Spinner animation="border" /> : ""}{" "}
              </Button>
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const mapState = ({ comments }) => ({ comments });
export default connect(mapState, {
  findAll,
  createComment,
})(Comments);
