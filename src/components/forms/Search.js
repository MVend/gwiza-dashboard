import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Search = ({ onSearch, onType }) => {
  const [searchHint, setSearchHint] = useState("");
  const search = (val) => {
    onType(val);
    setSearchHint(val);
  };

  const onSend = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Row className="mt-4">
      <Col>
        <Form lg="6" className="float_right" onSubmit={onSend}>
          <Form.Group as={Row}>
            <Col lg="7">
              <Form.Control
                type="text"
                value={searchHint}
                size="sm"
                onChange={(e) => search(e.target.value)}
                placeholder="Search"
              />
            </Col>
            <Col className="float_right">
              <Button size="sm" onClick={onSend}>Search</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
