export function replacePercentTwenty(slugName: string): string {
  return slugName.replace(/%20/g, " ");
}

export function calculateTotalAmount(transactions: Transaction[]): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

// Example usage:
