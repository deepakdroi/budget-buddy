"use client";
import { fetchMonthlyExpense } from "@/app/actions/transactionAction";
import { doesUserExist } from "@/app/actions/userActions";
import MonthlyExpense from "@/components/MonthlyExpense";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Charts({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const router = useRouter();
  const [transactions, setTransactions] = useState<MonthlyExpenseData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string>("Buddy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userExists = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params; // Resolve the promise
        const { user } = resolvedParams; // Safely destructure

        const currentUser = await doesUserExist(user);
        if (currentUser.status === "error") {
          console.log("User does not exist.");
          router.push(`/`);
          return; // Exit early to prevent further execution
        }

        // Set user state before fetching transactions
        setLoggedInUser(currentUser.data);

        const fetchTransactions = await fetchMonthlyExpense(
          currentUser.data,
          "2025"
        );

        if (fetchTransactions.status === "error") {
          if (fetchTransactions.error !== "No records found") {
            router.push(`/${currentUser.data}`);
            return; // Exit early
          } else {
            console.log("No transactions found");
            setTransactions([]); // Update state with empty array
          }
        } else {
          setTransactions(fetchTransactions.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in Charts component:", error);
        setLoading(false);
      }
    };

    userExists();
  }, [params, router]); // Add dependencies to prevent stale closures

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hey {loggedInUser}
          </h1>
        </div>
        <MonthlyExpense data={transactions} />
        <div className="mt-8 flex justify-center gap-3">
          {/* <NewTransaction user={loggedInUser} /> */}
        </div>
      </div>
    </div>
  );
}
