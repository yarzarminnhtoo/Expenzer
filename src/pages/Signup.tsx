import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { user } from "../models/user";

interface props {
  showError: boolean;
  onSignup: (data: user) => void;
  onLogin: () => void;
}

function Signup({ showError, onSignup, onLogin }: props) {
  const [formData, setFormData] = useState<user>({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ height: "100vh", width: "300px" }}
          >
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="text-primary">Expenzer</h1>
                <br />
                <br />
                <h3>Sign up</h3>
                <h6>Control your expense and save money.</h6>
              </div>
            </div>
            <br />
            <br />
            <div className="d-flex flex-column">
              <FormGroup className="mb-2">
                <FormLabel>Name</FormLabel>
                <FormControl
                  className="form-control"
                  name="name"
                  type="text"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Username</FormLabel>
                <FormControl
                  className="form-control"
                  name="username"
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl
                  className="form-control"
                  name="password"
                  type="password"
                  autoComplete="off"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                  className="form-control"
                  name="email"
                  type="text"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>
            </div>
            <br />
            <div className="d-flex flex-column">
              <Button onClick={() => onSignup(formData)} className="mb-2">
                Sign up
              </Button>
              <Button variant="outline-primary" onClick={onLogin}>
                Go back to login
              </Button>
            </div>
            <br />
            {showError && (
              <div className="d-flex flex-column">
                <Alert variant="danger">Sign up failed. Try again!</Alert>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Signup;
