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
