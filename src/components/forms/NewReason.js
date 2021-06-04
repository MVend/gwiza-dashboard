import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createReason, updateReason } from "../../redux/actions/reasonsActions";

const NewReason = ({
  createReason,
  isEdit,
  reason,
  closeModal,
  updateReason,
  reasons: { btnLoading },
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [reason_type, setReasonType] = useState("");
  const [reason_description, setReasonDescription] = useState("");
  const [reason_amount, setReasonAmount] = useState("");
  const { group_id } = useParams();

  const handleClose = () => {
    closeModal();
    setShow(false);
    setReasonAmount("");
    setReasonType("");
    setReasonDescription("");
  };

  const data = {
    group_id,
    reason_amount,
    reason_type,
    reason_description,
  };

  useEffect(() => {
    if (isEdit) {
      handleShow();
      setReasonAmount(reason.reason_amount);
      setReasonType(reason.reason_type);
      setReasonDescription(reason.reason_description);
    }
  }, [isEdit, reason]);

  const saveReason = () => {
    if (!isEdit) return createReason(data);
    updateReason(data, reason.reason_id);
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        + New Reason
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!isEdit && "New Reason"}
            {isEdit && "Edit Reason"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveReason}>
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  value={reason_type}
                  onChange={(e) => setReasonType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="fine">Fine</option>
                  <option value="social fund">Social fund</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={reason_amount}
                  onChange={(e) => setReasonAmount(e.target.value)}
                  placeholder="Enter Amount"
                />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason_description}
                onChange={(e) => setReasonDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary" onClick={saveReason}>
            Save
            {btnLoading && <Spinner animation="border" />}
            {!btnLoading && ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = ({ reasons }) => ({ reasons });
export default connect(mapState, { createReason, updateReason })(NewReason);
