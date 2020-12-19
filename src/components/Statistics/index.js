import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import StatsHeader from "./StatsHeader";
import Charts from "./Charts";
import { connect } from "react-redux";
import { getDashboardData } from "../../redux/actions/dashboardActions";

const Statistics = ({ getData, data: { values: data, isLoading } }) => {
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container fluid>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <StatsHeader data={data} />
          <Charts data={data} />
        </>
      )}
    </Container>
  );
};

const mapState = ({ dashboard }) => ({ data: dashboard });
export default connect(mapState, { getData: getDashboardData })(Statistics);
