"use client";
import { getTransactionHistory } from "@/app/actions/transactionAction";
import { doesUserExist } from "@/app/actions/userActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateTotalAmount } from "@/lib/helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TransactionsPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string>("Buddy");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>();
  // Empty dependency array ensures effect runs only once
  useEffect(() => {
    const userExists = async () => {
      const resolvedParams = await params; // Resolve the promise
      const { user } = resolvedParams; // Safely destructure
      const currentUser = await doesUserExist(user);
      if (currentUser.status === "error") {
        console.log("User does not exists.");
        router.push(`/`);
      } else {
        const fetchTransactions = await getTransactionHistory(currentUser.data);
        if (fetchTransactions.status === "error") {
          if (fetchTransactions.error !== "No transactions found") {
            router.push(`/${currentUser.data}`);
          } else {
            console.log("No transactions found");
            setTransactions([]); // Update state
          }
        } else {
          setTransactions(fetchTransactions.data); // Update state
        }
        setLoggedInUser(currentUser.data); // Update user state
      }
    };
    userExists();
  }, []);

  // New useEffect to calculate totalExpense based on updated transactions state
  useEffect(() => {
    const grandTotalExpense = calculateTotalAmount(transactions);
    setTotalExpense(grandTotalExpense);
  }, [transactions]); // Dependency array ensures it runs whenever transactions change

  const toggleIdExpansion = (id: string) => {
    setExpandedId(expandedId === id ? null : id); // Toggle expansion
  };

  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hey {loggedInUser}
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <Table>
              <TableCaption>Expenses this month.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    onClick={() => setSelectedTx(transaction)}
                    className="cursor-pointer hover:bg-muted transition-colors"
                  >
                    <TableCell className="font-medium">
                      <span
                        className="cursor-pointer text-blue-500"
                        onClick={() => toggleIdExpansion(transaction.id)}
                      >
                        {expandedId === transaction.id
                          ? transaction.id
                          : `${transaction.id.slice(0, 5)}...`}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">{totalExpense}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {/* <NewTransaction user={loggedInUser} /> */}
          </div>
        </div>
      </div>
      <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
        <DialogContent>
          {selectedTx && (
            <>
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogDescription>
                  Details of the selected transaction
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Category:</strong> {selectedTx.category}
                </p>
                <p>
                  <strong>Amount:</strong> ${selectedTx.amount}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedTx.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <strong>Description:</strong> {selectedTx.description}
                </p>
              </div>
              <div className="pt-4">
                <Button onClick={() => setSelectedTx(null)} variant="secondary">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
