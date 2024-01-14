import { Button, Col, Container, Row } from "react-bootstrap";
import ExpenseDetailList from "../components/ExpenseDetailList";
import ExpenseDetailForm from "../components/ExpenseDetailForm";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { OwnClass } from "../helpers/CssHelper";
import { useMediaQuery } from "react-responsive";
import { expense_detail } from "../models/expense_detail";
import apiClient from "../services/api-client";
import { AxiosResponse, CanceledError } from "axios";
import FormatHelper from "../helpers/FormatHelper";
import dateFormat from "dateformat";

function ExpenseDetailPage() {
  const isSmallScreen = useMediaQuery({ maxWidth: 700 });
  const [expense_details, setExpense_details] = useState<expense_detail[]>([]);
  const [expense_detail, setExpense_detail] = useState<expense_detail>({
    amount: 0,
    type: "",
    note: "",
    id: "",
  });
  const [editable, setEditable] = useState(false);
  const [show, setShow] = useState(false);
  //get parent id from parameter
  const { id } = useParams();

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    state?.action === "edit" && setEditable(true);

    const controller = new AbortController();
    apiClient
      .get<expense_detail[]>(`/api/expenses/details/${id}`, {
        signal: controller.signal,
      })
      .then(({ data }: AxiosResponse) => {
        setExpense_details(data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <ExpenseDetailForm
        default_info={expense_detail}
        showed={show}
        onClosed={() => {
          setShow(false);
        }}
        onSubmit={(e) => {
          setShow(false);
          //check whether add or edit
          if (expense_detail.id === "") {
            apiClient
              .post(`/api/expenses/create/detail/${id}`, e)
              .then(({ data }: AxiosResponse) => {
                setExpense_details([...expense_details, data]);
              });
          } else {
            apiClient
              .put(`/api/expenses/update/detail/${id}`, e)
              .then(({ data }: AxiosResponse) => {
                const updatedDetails = expense_details.map((detail) =>
                  detail.id === e.id ? e : detail
                );
                setExpense_details(updatedDetails);
              });
          }
        }}
      />
      <Container>
        <Row>
          <Col
            className="d-flex align-items-center pb-2"
            sm={12}
            md
            lg
            xl
            xxl={9}
          >
            <h5>For {dateFormat(new Date().toString(), "mmm d, yyyy")}</h5>
          </Col>
          {editable && (
            <Col
              className={`${OwnClass(isSmallScreen)}` + " pb-2"}
              sm={12}
              md
              lg
              xl
              xxl={3}
            >
              <Button
                variant="primary"
                //clean up data for new form
                onClick={() => {
                  setExpense_detail({
                    amount: 0,
                    type: "",
                    note: "",
                    id: "",
                  });
                  setShow(true);
                }}
              >
                Add expense
              </Button>
            </Col>
          )}
          <br />
          <br />
          <ExpenseDetailList
            editview={editable}
            objs={expense_details}
            onDeleted={(uniqueid) => {
              apiClient
                .delete(
                  `api/expenses/delete/detail/${uniqueid}?parent_id=${id}`
                )
                .then(({ data }: AxiosResponse) => {
                  setExpense_details(
                    expense_details.filter((a) => a.id !== uniqueid)
                  );
                });
            }}
            onEdited={(obj) => {
              //bind data and open modal dialog
              setExpense_detail(obj);
              setShow(true);
            }}
          />

          <Col className={`${OwnClass(isSmallScreen)}` + " pt-2"}>
            <h3>
              Total{" "}
              {FormatHelper.getCurrencyNumber(
                expense_details.reduce(
                  (sum, expense) =>
                    sum + parseInt(expense.amount.toString(), 10),
                  0
                )
              )}{" "}
              $
            </h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ExpenseDetailPage;
