"use server";

import { TransactionSchema } from "@/lib/schema/TransactionSchema";
import { getUserIdByName } from "./userActions";
import { prisma } from "@/lib/prisma";
import { formatTransactions } from "@/lib/helper";

export async function addExpense(
  data: TransactionSchema,
  user: string
): Promise<ActionResult<string>> {
  try {
    const userId = await getUserIdByName(user);
    if (userId.status === "error") {
      return { status: "error", error: userId.data };
    }
    const { category, amount, date, description } = data;
    const transaction = await prisma.transaction.create({
      data: {
        category,
        amount,
        date,
        description,
        userId: userId.data,
      },
    });
    if (transaction) {
      return { status: "success", data: "Expense added successfully" };
    } else {
      return { status: "error", error: "Unable to add expense" };
    }
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Unable to add expense" };
  }
}

export async function getTransactionHistory(
  user: string
): Promise<ActionResult<Transactions>> {
  try {
    const userId = await getUserIdByName(user);
    if (userId.status === "error") {
      return { status: "error", error: "User not found" };
    }
    console.log(userId.data);
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId.data,
      },
      select: {
        id: true,
        category: true,
        amount: true,
        date: true,
        description: true,
      },
    });

    if (!transactions) {
      return {
        status: "error",
        error: "Failed to fetch transaction list from the database",
      };
    }
    if (transactions.length === 0) {
      return { status: "error", error: "No transactions found" };
    } else {
      console.log(transactions);
      return { status: "success", data: transactions };
    }
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Unable to fetch transaction history" };
  }
}

export async function deleteTransaction(
  id: string
): Promise<ActionResult<string>> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transaction) {
      return { status: "error", error: "Transaction not found" };
    }
    const deleteTransaction = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    if (!deleteTransaction) {
      return {
        status: "error",
        error: "Failed to delete",
      };
    }
    console.log(deleteTransaction);
    return { status: "success", data: "Deleted" };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Unable to reach database. try again later",
    };
  }
}
export async function editTransaction(
  data: TransactionSchema,
  user: string,
  id: string
): Promise<ActionResult<string>> {
  let currentUserId = null;
  try {
    const userId = await getUserIdByName(user);
    if (userId.status === "success") {
      currentUserId = userId.data;
    } else {
      return { status: "error", error: "User not authorized" };
    }
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
        userId: currentUserId,
      },
    });
    if (!transaction) {
      return { status: "error", error: "Transaction not found" };
    }
    const editedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        category: data.category,
        amount: data.amount,
        date: data.date,
        description: data.description,
        userId: currentUserId,
      },
    });

    if (!editedTransaction) {
      return {
        status: "error",
        error: "Failed to edit",
      };
    }
    return { status: "success", data: "Transaction successfully updated" };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Unable to reach database. try again later",
    };
  }
}

export async function fetchMonthlyExpense(
  user: string,
  year: string
): Promise<ActionResult<MonthlyExpenseData[]>> {
  try {
    // Get user ID
    const userId = await getUserIdByName(user);
    if (userId.status === "error") {
      return { status: "error", error: "User not found" };
    }

    console.log("User ID:", userId.data);

    // Parse year to ensure it's properly handled in date calculations
    const yearNum = parseInt(year);

    // Format dates properly for Prisma
    const startDate = new Date(Date.UTC(yearNum, 0, 1)); // January 1st of the year
    const endDate = new Date(Date.UTC(yearNum + 1, 0, 1)); // January 1st of next year

    console.log("Date range:", startDate, "to", endDate);

    // Query transactions
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId.data,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        amount: true,
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    console.log("Found transactions:", transactions.length);

    if (transactions.length === 0) {
      return {
        status: "error",
        error: "No transactions found", // Changed to match what you check for in the component
      };
    } else {
      const formattedTransactions = formatTransactions(transactions);
      return { status: "success", data: formattedTransactions };
    }
  } catch (error) {
    console.error("Transaction fetch error:", error);
    return { status: "error", error: "Unable to fetch transaction history" };
  }
}
