"use client";

import AuthForm from "@/components/AuthForm";
import { signInCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInCredentials}
    />
  );
};

export default Page;
