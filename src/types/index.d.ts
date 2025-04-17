type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type Transaction = {
  id: string;
  category:
    | "Food & Dining"
    | "Transportation"
    | "Housing"
    | "Health & Fitness"
    | "Entertainment"
    | "Personal care"
    | "Education"
    | "Investments"
    | "Debt Payments"
    | "Gifts and Donations"
    | "Shopping"
    | "Miscellaneous"
    | string; // Allow any string value to handle cases outside predefined literals
  amount: number;
  date: Date;
  description: string | null;
};

type Transactions = Transaction[]; // Array of Transaction objects
