"use client";
import React, { useEffect, useState } from "react";
import { doesUserExist } from "../actions/userActions";
import { useRouter } from "next/navigation";
import NewTransaction from "@/components/NewTransaction";

export default function UserPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string>("Buddy");
  useEffect(() => {
    const userExists = async () => {
      const { user } = await params;
      const currentUser = await doesUserExist(user);

      console.log(currentUser.status);
      if (currentUser.status === "error") {
        router.push("/");
      } else setLoggedInUser(currentUser.data);
    };
    userExists();
  }, [params, router]);
  const defaultValue = {
    category: "Food & Dining" as const,
    amount: 0,
    date: new Date(),
    description: "",
  };
  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Welcome {loggedInUser}
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
              What would you like to do?
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <NewTransaction
              user={loggedInUser}
              defaultValues={defaultValue}
              buttonLabel={"Add New Expense"}
              transactionId={null}
            />
          </div>
        </div>
      </div>
    </>
  );
}
