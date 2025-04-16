"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  TransactionSchema,
  transactionSchema,
} from "@/lib/schema/TransactionSchema";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { addExpense } from "@/app/actions/transactionAction";

export default function NewTransaction({ user }: { user: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      date: undefined,
      description: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(data: TransactionSchema) {
    const result = await addExpense(data, user);
    if (result.status === "success") {
      console.log("Result from addExpense: ", result.data);
      router.push(`/${user}`);
      // }
      // console.log("Result from signInUser: ", result);
      // ✅ This will be type-safe and validated.
    } else console.log("Error from addExpense: ", result.error);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Add New Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
          <DialogDescription>Fill the details below.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <div className="w-full text-left">
                            {field.value || "Select category"}
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {[
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
                          ].map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose a category for this transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount (greater than 0)"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
                      />
                    </FormControl>
                    <FormDescription>
                      Specify the amount for this transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of expense</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP") // Format for display
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="z-50 w-auto p-0 rounded-2xl bg-white dark:bg-slate-700 shadow-md"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          } // Ensure selected value is a Date
                          onSelect={(date) =>
                            field.onChange(date ? new Date(date) : undefined)
                          } // Ensure the form value is a Date
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of expense should be today or in the past.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a description for this transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
