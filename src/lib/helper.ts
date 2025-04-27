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
