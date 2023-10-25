import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { account } from "../models/account";
import { Alert } from "react-bootstrap";

interface props {
  showed: boolean;
  showError: boolean;
  onClosed: () => void;
  onSubmit: (e: account) => void;
}

function LoginForm({ showed, showError, onClosed, onSubmit }: props) {
  const [formData, setFormData] = useState<account>({
    username: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e: any) => {
    console.log("aa");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      <Modal show={showed} onHide={onClosed}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            {showError && (
              <Alert variant="danger">
                {" "}
                Authentication failed. Please try again.
              </Alert>
            )}
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

export default LoginForm;
