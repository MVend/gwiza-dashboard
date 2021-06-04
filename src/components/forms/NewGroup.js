import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { createGroup, updateGroup } from "../../redux/actions/groupsActions";
import moment from "moment";
import {
  findCells,
  findDistricts,
  findProvinces,
  findSectors,
  findVillages,
} from "../../redux/actions/locationsActions";

const NewGroup = ({
  createGroup,
  isEdit,
  closeModal,
  group,
  locations: { isLoading, provinces, districts, sectors, cells, villages },
  updateGroup,
  findProvinces,
  findDistricts,
  findSectors,
  findCells,
  findVillages,
  groups: { btnLoading },
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");

  const onChangeLocation = (e) => {
    const { name, value } = e.target;
    if (name === "province") {
      setProvince(value);
      return findDistricts({ province_id: value });
    }
    if (name === "district") {
      setDistrict(value);
      return findSectors({ district_id: value });
    }
    if (name === "sector") {
      setSector(value);
      return findCells({ sector_id: value });
    }
    if (name === "cell") {
      setCell(value);
      return findVillages({ cell_id: value });
    }
    if (name === "village") {
      setVillage(value);
    }
  };

  const handleClose = () => {
    closeModal();
    setShow(false);
    setGroupName("");
    setDayOfMeeting();
    setTimeOfMeeting(new Date());
    setInterestRate("");
    setMaxLoanDuration("");
    setMaxWeeklyShares("");
    setLoanToSavingsRatio("");
    setShareValue("");
    setSocialFundAmount("");
    //Location
    setProvince("");
    setDistrict("");
    setSector("");
    setCell("");
    setVillage("");
  };

  const [group_name, setGroupName] = useState("");
  const [day_of_meeting, setDayOfMeeting] = useState("");
  const [time_of_meeting, setTimeOfMeeting] = useState(new Date());
  const [share_value, setShareValue] = useState("");
  const [max_weekly_shares, setMaxWeeklyShares] = useState("");
  const [socialfund_amount, setSocialFundAmount] = useState("");
  const [loan_to_savings_ratio, setLoanToSavingsRatio] = useState("");
  const [interest_rate, setInterestRate] = useState("");
  const [max_loan_duration, setMaxLoanDuration] = useState("");

  const data = {
    group_name,
    day_of_meeting,
    time_of_meeting: moment(time_of_meeting).format("HH:mm"),
    share_value,
    max_weekly_shares,
    socialfund_amount,
    loan_to_savings_ratio,
    interest_rate,
    max_loan_duration,
    village_id: village,
  };

  useEffect(() => {
    findProvinces();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const {
        province_id,
        district_id,
        sector_id,
        cell_id,
        village_id,
      } = group.location;
      findDistricts({ province_id });
      findSectors({ district_id });
      findCells({ sector_id });
      findVillages({ cell_id });
      handleShow();
      setGroupName(group.group_name);
      setDayOfMeeting(group.day_of_meeting);
      setTimeOfMeeting(new Date(`2020-05-10 ${group.time_of_meeting}`));
      setInterestRate(group.interest_rate);
      setMaxLoanDuration(group.max_loan_duration);
      setMaxWeeklyShares(group.max_weekly_shares);
      setLoanToSavingsRatio(group.loan_to_savings_ratio);
      setShareValue(group.share_value);
      setSocialFundAmount(group.socialfund_amount);
      //Location
      setProvince(province_id);
      setDistrict(district_id);
      setSector(sector_id);
      setCell(cell_id);
      setVillage(village_id);
    }
  }, [isEdit, group]);

  const saveGroup = () => {
    if (!isEdit) return createGroup(data);
    updateGroup(data, group.group_id);
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShow}>
        + New Group
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!isEdit && "New Group"}
            {isEdit && "Edit Group"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveGroup}>
            <Form.Group>
              <Form.Label>Group name</Form.Label>
              <Form.Control
                type="text"
                value={group_name}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter Group name"
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Meeting Day</Form.Label>
                <Form.Control
                  as="select"
                  value={day_of_meeting}
                  onChange={(e) => setDayOfMeeting(e.target.value)}
                >
                  <option value="">Select day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Form.Control>
              </Col>

              <Col>
                <Form.Label>Meeting Time</Form.Label>
                <br />

                <DatePicker
                  selected={time_of_meeting}
                  onChange={(date) => setTimeOfMeeting(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Share value</Form.Label>
                <Form.Control
                  type="number"
                  value={share_value}
                  onChange={(e) => setShareValue(e.target.value)}
                  placeholder="Enter share value"
                />
              </Col>

              <Col>
                <Form.Label>Social fund amount</Form.Label>
                <Form.Control
                  type="number"
                  value={socialfund_amount}
                  onChange={(e) => setSocialFundAmount(e.target.value)}
                  placeholder="Enter Social fund amount"
                />
              </Col>

              <Col>
                <Form.Label>Max weekly shares</Form.Label>
                <Form.Control
                  type="number"
                  value={max_weekly_shares}
                  onChange={(e) => setMaxWeeklyShares(e.target.value)}
                  placeholder="Enter Max weekly shares"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Loan to saving ratio</Form.Label>
                <Form.Control
                  type="number"
                  value={loan_to_savings_ratio}
                  onChange={(e) => setLoanToSavingsRatio(e.target.value)}
                  name="loan_to_savings_ratio"
                  placeholder="Enter saving value"
                />
              </Col>

              <Col>
                <Form.Label>Interest rate</Form.Label>
                <Form.Control
                  type="number"
                  value={interest_rate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Enter Interest rate"
                />
              </Col>

              <Col>
                <Form.Label>Max loan duration</Form.Label>
                <Form.Control
                  type="number"
                  value={max_loan_duration}
                  onChange={(e) => setMaxLoanDuration(e.target.value)}
                  placeholder="Enter Max weekly shares"
                />
              </Col>
            </Form.Group>
            {/* Location */}
            <Form.Group as={Row}>
              <Col>
                <Form.Label>Province</Form.Label>
                <Form.Control
                  as="select"
                  value={province}
                  name="province"
                  onChange={onChangeLocation}
                >
                  <option value="">Select province</option>
                  {provinces.length > 0 &&
                    provinces.map(({ province_id, province_name }) => (
                      <option key={province_id} value={province_id}>
                        {province_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>District</Form.Label>
                <Form.Control
                  as="select"
                  value={district}
                  name="district"
                  onChange={onChangeLocation}
                >
                  <option value="">Select district</option>
                  {districts.length > 0 &&
                    districts.map(({ district_id, district_name }) => (
                      <option key={district_id} value={district_id}>
                        {district_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>

              <Col>
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  as="select"
                  value={sector}
                  name="sector"
                  onChange={onChangeLocation}
                >
                  <option value="">Select sector</option>
                  {sectors.length > 0 &&
                    sectors.map(({ sector_id, sector_name }) => (
                      <option key={sector_id} value={sector_id}>
                        {sector_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Form.Label>Cell</Form.Label>
                <Form.Control
                  as="select"
                  value={cell}
                  name="cell"
                  onChange={onChangeLocation}
                >
                  <option value="">Select cell</option>
                  {cells.length > 0 &&
                    cells.map(({ cell_id, cell_name }) => (
                      <option key={cell_id} value={cell_id}>
                        {cell_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Village</Form.Label>
                <Form.Control
                  as="select"
                  value={village}
                  name="village"
                  onChange={onChangeLocation}
                >
                  <option value="">Select village</option>
                  {villages.length > 0 &&
                    villages.map(({ village_id, village_name }) => (
                      <option key={village_id} value={village_id}>
                        {village_name}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary" onClick={saveGroup}>
            Save
            {btnLoading && <Spinner animation="border" />}
            {!btnLoading && ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = ({ groups, locations }) => ({ groups, locations });
export default connect(mapState, {
  createGroup,
  updateGroup,
  findProvinces,
  findDistricts,
  findSectors,
  findCells,
  findVillages,
})(NewGroup);
