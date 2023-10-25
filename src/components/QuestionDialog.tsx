import { useState, ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface props {
  header: string;
  children: ReactNode;
  show: boolean;
  onProceed: () => void;
  onClosed: () => void;
}
function QuestionDialog({
  show,
  header,
  children,
  onProceed,
  onClosed,
}: props) {
  return (
    <>
      <Modal show={show} onHide={onClosed}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClosed}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClosed();
              onProceed();
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuestionDialog;
