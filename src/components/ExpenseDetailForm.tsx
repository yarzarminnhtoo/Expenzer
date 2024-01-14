import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { expense_detail } from "../models/expense_detail";
import { useState, useEffect } from "react";
interface props {
  default_info: expense_detail;
  showed: boolean;
  onClosed: () => void;
  onSubmit: (e: expense_detail) => void;
}
const types = ["General Expense", "Pay roll", "Maintenance", "Buying things"];
function ExpenseDetailForm({
  default_info,
  showed,
  onClosed,
  onSubmit,
}: props) {
  const [formData, setFormData] = useState<expense_detail>({
    amount: 0,
    note: "",
    type: "",
    id: "",
  });

  //
  const onShown = () => {
    if (default_info.id !== "") setFormData(default_info);
  };

  const [validated, setValidated] = useState(false);
  const handleChange = (e: any) => {
    // if (!info) {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // }
  };

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
      <Modal onShow={onShown} show={showed} onHide={onClosed}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add your expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                defaultValue={default_info?.amount}
                type="number"
                placeholder="Enter amount"
                name="amount"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Expense Type</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                name="type"
                defaultValue={default_info?.type}
                //value={info?.type}
                onChange={handleChange}
              >
                <option>Choose expense type</option>
                {types.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter something about expense"
                name="note"
                defaultValue={default_info?.note}
                onChange={handleChange}
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

export default ExpenseDetailForm;
