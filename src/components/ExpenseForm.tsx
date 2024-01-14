import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { expense } from "../models/expense";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface props {
  info?: expense;
  showed: boolean;
  onClosed: () => void;
  onSubmit: (e: expense) => void;
}

function ExpenseForm({ info, showed, onClosed, onSubmit }: props) {
  const [formData, setFormData] = useState<expense>({
    account_id: "",
    amount: 0,
    date: new Date(),
    note: "",
    id: "",
    details: [],
  });
  //testing
  const [validated, setValidated] = useState(false);
  const handleDateChange = (e: Date) => {
    setDate(e);
    setFormData({
      ...formData,
      ["date"]: e,
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [date, setDate] = useState<Date>(new Date());
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      formData && onSubmit(formData);
      event.preventDefault();
    }
  };
  return (
    <>
      <Modal show={showed} onHide={onClosed}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add daily expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                required
                placeholder="Write something about it"
                name="note"
                value={info?.note}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              {/* <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter something about expense"
                name="note"
                value={info?.note}
                onChange={handleChange}
              /> */}
              <DatePicker
                onChange={handleDateChange}
                className="form-control"
                selected={date}
                name="date"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClosed}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ExpenseForm;
