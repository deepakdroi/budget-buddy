export function replacePercentTwenty(slugName: string): string {
  return slugName.replace(/%20/g, " ");
}

export function calculateTotalAmount(transactions: Transaction[]): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

export function formatTransactions(
  transactions: { amount: number; date: Date }[]
) {
  const monthlyExpenses: Record<string, number> = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  transactions.forEach(({ amount, date }) => {
    const month = date.toLocaleString("en-US", { month: "short" });
    if (monthlyExpenses[month] !== undefined) {
      monthlyExpenses[month] += amount;
    }
  });

  return Object.entries(monthlyExpenses).map(([name, expense]) => ({
    name,
    expense,
  }));
}

type CategoricExpenseData = {
  category: string;
  amount: number;
};

const CATEGORY_LIST: CategoricExpenseData["category"][] = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Health & Fitness",
  "Entertainment",
  "Personal care",
  "Education",
  "Investments",
  "Debt Payments",
  "Gifts and Donations",
  "Shopping",
  "Miscellaneous",
];

export function summarizeExpenses(
  expenses: { amount: number; category: string }[]
): CategoricExpenseData[] {
  const summaryMap = new Map<string, number>();

  // Initialize all categories with 0
  CATEGORY_LIST.forEach((category) => summaryMap.set(category, 0));

  // Sum amounts for existing categories
  expenses.forEach(({ category, amount }) => {
    if (summaryMap.has(category)) {
      summaryMap.set(category, summaryMap.get(category)! + amount);
    }
  });

  // Convert map to array
  return CATEGORY_LIST.map((category) => ({
    category,
    amount: summaryMap.get(category)!,
  }));
}
