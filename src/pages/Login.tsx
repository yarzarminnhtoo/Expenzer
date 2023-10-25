import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { account } from "../models/account";

interface props {
  onSignup: () => void;
  showLoginError: boolean;
  onAuthenticate: (data: account) => void;
}

function Login({ showLoginError, onAuthenticate, onSignup }: props) {
  const [formData, setFormData] = useState<account>({
    username: "",
    password: "",
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
                <h3>Get access</h3>
                <h6>Control your expense and save money.</h6>
              </div>
            </div>
            <br />
            <br />
            <div className="d-flex flex-column">
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
            </div>
            <br />
            <div className="d-flex flex-column">
              <Button onClick={() => onAuthenticate(formData)} className="mb-2">
                Login
              </Button>
              <Button variant="outline-primary" onClick={onSignup}>
                Sign up
              </Button>
            </div>
            <br />
            {showLoginError && (
              <div className="d-flex flex-column">
                <Alert variant="danger">
                  Authentication failed. Try again!
                </Alert>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
