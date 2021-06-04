import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import PieChart from "../charts/PieChartComp";
import BarChart from "../charts/BarChartComp";

const Charts = ({ data: { clusters, male, female, sim, noSim } }) => {
  const genderData = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  const phoneNumberData = [
    { name: "SIM", value: sim },
    { name: "No SIM ", value: noSim },
  ];

  return (
    <Row className="mt-3">
      <Col>
        <Row>
          <Col lg="12">
            <Card className="mb-5">
              <Card.Body>
                <Row>
                  <Col>
                    <h3>Gender</h3>
                    <PieChart data={genderData} />
                  </Col>
                  <Col>
                    <h3>SIM cards</h3>
                    <PieChart data={phoneNumberData} />
                  </Col>
                  <Col>
                    <h3>Clusters</h3>
                    <BarChart data={clusters} name="cluster" value="groups" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Charts;
