import { Button, Card } from "react-bootstrap";
import { expense } from "../models/expense";
import dateFormat from "dateformat";
import FormatHelper from "../helpers/FormatHelper";
interface props {
  onClicked: (obj: expense, action: string) => void;
  expense: expense;
}
function ExpenseCard({ expense, onClicked }: props) {
  return (
    <Card key={expense.id} className="mb-4" style={{ width: "15rem" }}>
      <Card.Body>
        <Card.Title>
          {FormatHelper.getCurrencyNumber(expense.amount)} $
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {dateFormat(expense.date.toString(), "mmm d, yyyy")}
        </Card.Subtitle>
        <Card.Text>
          <b>{expense.note}</b>
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button
            size="sm"
            onClick={() => {
              onClicked(expense, "delete");
            }}
            variant="outline-danger"
          >
            Delete
          </Button>

          <Button
            size="sm"
            onClick={() => {
              onClicked(expense, "edit");
            }}
            variant="outline-secondary"
            style={{ margin: "0px 10px" }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              onClicked(expense, "view");
            }}
          >
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ExpenseCard;
