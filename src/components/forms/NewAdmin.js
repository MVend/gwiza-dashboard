import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { create } from "../../redux/actions/adminsActions";

const NewAdmin = ({
  create,
  admins: { btnLoading },
  members: {
    values: { rows },
  },
}) => {
  const [show, setShow] = useState(false);
  const [member, setMember] = useState("");
  const { group_id } = useParams();
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const save = () => {
    const data = {
      payload: {
        group_id,
        phone_number: member.value,
      },
      user: member.user,
    };

    create(data);
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        + New Admin
      </Button>

      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> New Admin </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={save}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              onChange={setMember}
              name="admin"
              options={rows.map((row) => ({
                user: row,
                label: `${row.first_name} ${row.last_name} - ${row.phone_number}`,
                value: row.phone_number,
              }))}
              placeholder="Search a member"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            disabled={!member === true}
            variant="primary"
            onClick={save}
          >
            Save
            {btnLoading && <Spinner animation="border" />}
            {!btnLoading && ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = ({ members, admins }) => ({ members, admins });
export default connect(mapState, { create })(NewAdmin);
