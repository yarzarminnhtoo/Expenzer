import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { expense } from "../models/expense";
import ExpenseCard from "../components/ExpenseCard";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import apiClient, { CanceledError } from "../services/api-client";
import { AxiosResponse } from "axios";
import QuestionDialog from "../components/QuestionDialog";
import dateFormat from "dateformat";
import FormatHelper from "../helpers/FormatHelper";
import Cookies from "js-cookie";
interface props {
  isAuthorized: boolean;
}
function HomePage({ isAuthorized }: props) {
  const navigate = useNavigate();
  const [deleteExpense, setDeleteExpense] = useState<expense>({
    amount: 0,
    note: "",
    date: new Date(),
    details: [],
    id: "",
    account_id: "",
  });
  const [showQuestion, setShowQuestion] = useState(false);
  const [show, setShow] = useState(false);
  const [expenses, setExpenses] = useState<expense[]>([]);
  const account_id = Cookies.get("account_id");
  useEffect(() => {
    const controller = new AbortController();
    //get expenses
    apiClient
      .get<expense[]>(`/api/expenses/gets/${account_id}`, {
        signal: controller.signal,
      })
      .then(({ data }: AxiosResponse) => {
        setExpenses(data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => controller.abort();
  }, []);

  const handleCardAction = (obj: expense, action: string) => {
    if (action !== "delete") {
      navigate(`/expensedetail/${obj.id}`, {
        state: { action: action },
      });
    } else {
      setDeleteExpense(obj);
      setShowQuestion(true);
    }
  };
  return (
    <>
      <QuestionDialog
        show={showQuestion}
        header={`Delete action - ${dateFormat(
          deleteExpense.date.toString(),
          "mmm d, yyyy"
        )}`}
        onProceed={() => {
          setShowQuestion(false);
          apiClient
            .delete(`/api/expenses/delete/${deleteExpense.id}`)
            .then(({ data }: AxiosResponse) => {
              setExpenses(expenses.filter((a) => a.id !== deleteExpense.id));
            })
            .catch((err) => {
              if (err instanceof CanceledError) return;
            });
        }}
        onClosed={() => {
          setShowQuestion(false);
        }}
      >
        <h4>{deleteExpense.amount} $</h4>
        <p>
          Are you going to delete daily expense card? It will lost everything.
        </p>
      </QuestionDialog>

      <ExpenseForm
        showed={show}
        onClosed={() => {
          setShow(false);
        }}
        onSubmit={(e) => {
          e.account_id = account_id ? account_id : "";
          console.log(e);
          setShow(false);
          apiClient
            .post("/api/expenses/create", e)
            .then(({ data }: AxiosResponse) => {
              navigate(`/expensedetail/${data.id}`, {
                state: { action: "edit" },
              });
            });
        }}
      />
      <Container style={{ height: "90vh" }}>
        <div className="d-flex justify-content-between">
          <div className=" align-items-center p-3">
            <h3>
              Total -{" "}
              {FormatHelper.getCurrencyNumber(
                expenses.reduce(
                  (sum, expense) =>
                    sum + parseInt(expense.amount.toString(), 10),
                  0
                )
              )}{" "}
              $
            </h3>
          </div>
          {isAuthorized && (
            <div className="align-items-center p-3">
              <Button variant="primary" onClick={() => setShow(true)}>
                Add daily expense
              </Button>
            </div>
          )}
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((a) => (
              <div key={a.id} style={{ marginRight: "10px" }}>
                <ExpenseCard
                  key={a.id}
                  expense={a}
                  onClicked={handleCardAction}
                />
              </div>
              // </Col>
            ))}
        </div>
      </Container>
    </>
  );
}

export default HomePage;
