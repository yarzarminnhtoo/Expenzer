import { expense_detail } from "./expense_detail";
export interface expense {
  account_id: string;
  id: string;
  amount: number;
  date: Date;
  note: string;
  details: expense_detail[];
}
