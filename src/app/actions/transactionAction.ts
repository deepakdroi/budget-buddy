"use server";

import { TransactionSchema } from "@/lib/schema/TransactionSchema";
import { getUserIdByName } from "./userActions";
import { prisma } from "@/lib/prisma";

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
