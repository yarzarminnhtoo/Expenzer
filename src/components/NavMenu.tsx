import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import QuestionDialog from "./QuestionDialog";
import { useState, useContext } from "react";
import { useUserContext } from "../contexts/UserContext";
interface props {
  onLogout: () => void;
  onNavigate: (path: string) => void;
}
function NavMenu({ onLogout, onNavigate }: props) {
  //deconstruct it from context to get or set
  const { username, setUsername } = useUserContext();
  const [showQuestion, setShowQuestion] = useState(false);
  return (
    <>
      <QuestionDialog
        show={showQuestion}
        header="Log out"
        onProceed={() => {
          setShowQuestion(false);
          onLogout();
        }}
        onClosed={() => {
          setShowQuestion(false);
        }}
      >
        <p>Are you going to log out now?</p>
      </QuestionDialog>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate("/home")}
            >
              Expenzer
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => onNavigate("/home")}>-</Nav.Link>
              {/* <Nav.Link href="#link">Setup</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>

            <Navbar.Text style={{ margin: "0 10px 0 0" }}>
              <b>{username}</b>
            </Navbar.Text>

            <Button
              onClick={() => {
                setShowQuestion(true);
              }}
              variant="outline-primary"
            >
              {" "}
              log out{" "}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;
