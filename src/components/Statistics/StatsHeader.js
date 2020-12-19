import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  faUserFriends,
  faFemale,
  faMale,
  faPhoneAlt,
  faPhoneSlash,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Box from "./Box";

const StatsHeader = ({
  data: { groups, members, male, female, sim, noSim },
}) => {
  return (
    <Row className="mt-3">
      <Col>
        <Row>
          <Col lg="12">
            <Card className="mb-5">
              <Card.Header>Statistics</Card.Header>
              <Card.Body>
                <Row>
                  <Box title="Total Groups" value={groups} icon={faDatabase} />
                  <Box
                    title="Total Members"
                    value={members}
                    icon={faUserFriends}
                  />
                  <Box title="Male" value={male} icon={faMale} />
                  <Box title="Female" value={female} icon={faFemale} />
                  <Box title="SIM" value={sim} icon={faPhoneAlt} />
                  <Box title="No  SIM" value={noSim} icon={faPhoneSlash} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StatsHeader;
