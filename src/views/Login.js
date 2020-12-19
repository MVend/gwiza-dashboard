import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Container,
  Toast,
} from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/actions/authActions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = props.auth;
  const loggedout = localStorage.getItem("loggedout");
  const showToast = loggedout ? true : false;

  const login = (e) => {
    e.preventDefault();
    if (!username || !password)
      return toast.error("Email and Password are required");
    props.login({ username, password });
  };
  return (
    <Container fluid>
      <Row>
        <Col className="hide-sm"></Col>
        <Col lg="4">
          <Form className="ml-3 mr-3 pt-5" onSubmit={login}>
            <Toast show={showToast}>
              <Toast.Body>
                {loggedout && JSON.parse(loggedout).message}
              </Toast.Body>
            </Toast>
            <h3>Log in</h3>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              onClick={login}
              className="btn btn-dark btn-lg btn-block"
            >
              Sign in
              {isLoading && <Spinner animation="border" />}
            </Button>
          </Form>
        </Col>
        <Col className="hide-sm"></Col>
      </Row>
    </Container>
  );
};
const mapState = ({ auth }) => ({
  auth,
});
export default connect(mapState, { login })(Login);
