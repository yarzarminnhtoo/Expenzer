import { Button, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { expense_detail } from "../models/expense_detail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormatHelper from "../helpers/FormatHelper";
interface props {
  editview: boolean;
  objs: expense_detail[];
  onEdited: (obj: expense_detail) => void;
  onDeleted: (uniqueid: string) => void;
}
function ExpenseDetailList({ objs, editview, onDeleted, onEdited }: props) {
  // /const [expenses, setExpenses] = useState<expense_detail[]>(objs);
  console.log(objs);
  return (
    <>
      {/* <ExpenseForm
        showed={showed}
        onClosed={() => {
          setShow(false);
        }}
        onSubmit={(e) => {
          console.log(e);
          alert(e.amount);
        }}
      /> */}

      <ListGroup as="ol" numbered>
        {objs.map((a) => (
          <ListGroup.Item
            key={a.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div key={a.id} className="ms-2 me-auto">
              <div className="fw-bold">{a.note}</div>
              {a.type}
            </div>
            <Col md={3} className="d-flex justify-content-end">
              <div key={a.id}>
                <b>{FormatHelper.getCurrencyNumber(a.amount)} $</b> <br />
                1:00 PM
              </div>
              {editview && (
                <div className="d-flex align-items-center justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onEdited(a)}
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDeleted(a.id)}
                    variant="outline-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              )}
            </Col>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ExpenseDetailList;
