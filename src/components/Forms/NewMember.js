import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createMember, updateMember } from "../../redux/actions/membersActions";

const NewMember = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const {
    members: { btnLoading },
    member,
    isEdit,
    closeModal,
    updateMember,
    createMember,
  } = props;

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [marital_status, setMaritalStatus] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");

  useEffect(() => {
    if (isEdit) {
      handleShow();
      setFirstName(member.first_name);
      setLastName(member.last_name);
      setDob(new Date(member.dob));
      setGender(member.gender);
      setNid(member.nid);
      setPhoneNumber(member.phone_number);
      setMaritalStatus(member.marital_status);
    }
  }, [isEdit, member]);

  const handleClose = () => {
    closeModal();
    setShow(false);
    setFirstName("");
    setLastName("");
    setDob(new Date());
    setGender("");
    setNid("");
    setPhoneNumber("");
    setMaritalStatus("");
  };

  const { group_id } = useParams();
  const data = {
    group_id,
    first_name,
    last_name,
    dob,
    nid,
    marital_status,
    phone_number,
    gender,
  };

  const saveMember = () => {
    if (!isEdit) return createMember(data);
    updateMember(data, member.member_id);
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        + New Member
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!isEdit && "New Member"}
            {isEdit && "Edit Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveMember}>
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Firstname"
                />
              </Col>

              <Col>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Lastname"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>National ID</Form.Label>
                <Form.Control
                  type="text"
                  value={nid}
                  maxLength={16}
                  minLength={16}
                  onChange={(e) => setNid(e.target.value)}
                  placeholder="Enter National ID"
                />
              </Col>

              <Col>
                <Form.Label>Date of Birth</Form.Label>

                <br />
                <DatePicker
                  selected={dob}
                  value={dob}
                  maxDate={new Date()}
                  onChange={(date) => setDob(date)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phone_number}
                  maxLength={12}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                />
              </Col>

              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Marital Status</Form.Label>
                <Form.Control
                  as="select"
                  value={marital_status}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary" onClick={saveMember}>
            Save
            {btnLoading && <Spinner animation="border" />}
            {!btnLoading && ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = ({ members }) => ({ members });
export default connect(mapState, { createMember, updateMember })(NewMember);
