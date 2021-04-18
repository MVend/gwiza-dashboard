import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { migrateAction } from "../../redux/actions/migrateAction";
import * as types from "../../redux/types";

const { Step } = Steps;

const steps = [
  {
    title: "Groups",
    content: (
      <Steps progressDot current={5} direction="vertical">
        <Step
          title="Fetch"
          description="Fetch new Groups in staging Database"
        />
        <Step
          title="Create"
          description="Migrate staging groups to the production Database"
        />
        <Step
          title="Update"
          description="Update staging groups with new Group Codes and Production Group IDs"
        />
      </Steps>
    ),
  },
  {
    title: "Wallets",
    content: (
      <Steps progressDot current={5} direction="vertical">
        <Step title="Fetch" description="Fetch migrated Groups" />
        <Step
          title="Create"
          description="Create Product Wallets of the migrated groups to the production Database"
        />
      </Steps>
    ),
  },
  {
    title: "Fines & Social fund",
    content: (
      <Steps progressDot current={5} direction="vertical">
        <Step
          title="Fetch"
          description="Fetch reasons and fines in the staging database"
        />
        <Step
          title="Fines"
          description="Create Fines to the production Database"
        />
        <Step
          title="Socialfund"
          description="Create Socialfund reasons to the production Database"
        />
      </Steps>
    ),
  },
  {
    title: "Members",
    content: (
      <Steps progressDot current={5} direction="vertical">
        <Step title="Fetch" description="Fetch staging members" />
        <Step
          title="Settings"
          description="Create members and their settings"
        />
        <Step title="Accounts" description="Create members Accounts" />
      </Steps>
    ),
  },
  {
    title: "Admins",
    content: (
      <Steps progressDot current={5} direction="vertical">
        <Step title="Fetch" description="Fetch staging admins" />
        <Step
          title="Create"
          description="Migrate admins to production database"
        />
      </Steps>
    ),
  },
];

const MigrationSteps = ({ migrate, migrations }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    const action =
      current === 0
        ? { endpoint: "/groups", actionType: types.MIGRATE_GROUPS }
        : current === 1
        ? { endpoint: "/wallets", actionType: types.MIGRATE_WALLETS }
        : current === 2
        ? { endpoint: "/reasons", actionType: types.MIGRATE_REASONS }
        : current === 3
        ? { endpoint: "/members", actionType: types.MIGRATE_MEMBERS }
        : current === 4
        ? { endpoint: "/admins", actionType: types.MIGRATE_ADMINS }
        : { endpoint: "/", actionType: types.COMPLETE_MIGRATIONS };

    migrate("get", action.endpoint, action.actionType);
    setCurrent(current + 1);
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Header>
                Migrate Staging Groups to the production Database
              </Card.Header>
              <Card.Body>
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <div className="m-4">{steps[current].content}</div>
                <div className="mt-3">
                  {current < steps.length - 1 && (
                    <Button
                      type="primary"
                      loading={migrations.isLoading}
                      onClick={() => next()}
                    >
                      {current === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => message.success("Migration completed")}
                    >
                      Finish
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapState = ({ migrations }) => ({ migrations });
export default connect(mapState, { migrate: migrateAction })(MigrationSteps);
