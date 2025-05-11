"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import ratelimit from "../ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    redirect("/too-fast");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result?.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "SignIn error" };
  }
};

export const signUp = async (credentials: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } =
    credentials;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    redirect("/too-fast");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    await signInCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup Error");
    return { success: false, message: "Signup Error" };
  }
};
