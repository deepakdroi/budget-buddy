"use server";

import { replacePercentTwenty } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { userSchema } from "@/lib/schema/UserSchema";

export async function signInUser(data: unknown): Promise<ActionResult<string>> {
  try {
    const parsedData = userSchema.parse(data);
    const user = await prisma.user.findUnique({
      where: {
        name: parsedData.name,
      },
    });
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name: parsedData.name,
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
      console.log(userExists.name, "exists");
      return { status: "success", data: userExists.name };
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

export async function getUserIdByName(name: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });
    if (user !== null) {
      return { status: "success", data: user.id };
    } else return { status: "error", data: "user does not exist" };
  } catch (error) {
    console.log(error);
    return { status: "error", data: "Server Error" };
  }
}
