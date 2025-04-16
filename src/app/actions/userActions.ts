"use server";

import { replacePercentTwenty } from "@/lib/helper";
import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/lib/schema/UserSchema";

export async function signInUser(
  data: UserSchema
): Promise<ActionResult<string>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: data.name,
      },
    });
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
        },
      });
      if (!newUser) {
        return { status: "error", error: "user not created" };
      } else {
        return { status: "success", data: "user created successfully" };
      }
    }
    console.log("Data from signInUser: ", data);
    return { status: "success", data: "user logged in successfully" };
  } catch (error) {
    console.log("Error from signInUser: ", error);
    return { status: "error", error: "user not logged in" };
  }
}

export async function doesUserExist(
  data: string
): Promise<ActionResult<string>> {
  try {
    const user = replacePercentTwenty(data);
    const userExists = await prisma.user.findUnique({
      where: {
        name: user,
      },
    });

    if (userExists) {
      return { status: "success", data: user };
    } else {
      return { status: "error", error: "user not found" };
    }
  } catch (error) {
    console.log("Error from doesUserExist: ", error);
    return {
      status: "error",
      error: "Unable to make connection to the database.",
    };
  }
}
