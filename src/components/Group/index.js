import { Container, Tab, Tabs } from "react-bootstrap";
import Members from "./Members";
import Details from "./Details";
import Reasons from "./Reasons";
import Comments from "./Comments";
import Admins from "./Admins";

const Group = () => {
  return (
    <Container fluid>
      <Details />
      <Tabs defaultActiveKey="members" transition={false}>
        <Tab eventKey="members" title="Members">
          <Members />
        </Tab>
        <Tab eventKey="admins" title="Admins">
          <Admins />
        </Tab>
        <Tab eventKey="fines" title="Fines and Social fund">
          <Reasons />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <Comments />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Group;
