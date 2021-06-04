import React from "react";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Box = ({ title, value, icon }) => {
  return (
    <Col lg="2" className="p-2">
      <Card>
        <Card.Body>
          <h4> {!value ? 0 : value.toLocaleString()} </h4>
          <div className="d-flex justify-content-between">
            <span className="text-muted">{title}</span>
            <span className="text-muted">
              <FontAwesomeIcon icon={icon} />
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Box;
