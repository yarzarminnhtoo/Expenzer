import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Component() {
  return (
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row className="mb-1">
        <Col className="bg-primary-subtle mx-1" xs={12} md={8} lg={8}>
          xs=12 md=8
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={6} md={4} lg={4}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row className="mb-1">
        <Col className="bg-primary-subtle mx-1" xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row className="mb-1">
        <Col className="bg-primary-subtle mx-1" xs={12}>
          xs=6
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={12}>
          xs=6
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className="bg-primary-subtle mx-1" xs>
          First, but unordered
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={{ order: 12 }}>
          Second, but last
        </Col>
        <Col className="bg-primary-subtle mx-1" xs={{ order: 1 }}>
          Third, but second
        </Col>
      </Row>
      <Row xs={12} md={4} lg={12}>
        <Col className="bg-primary-subtle mx-1">1 of 2</Col>
        <Col className="bg-primary-subtle mx-1">2 of 2</Col>
      </Row>
    </Container>
  );
}

export default Component;
