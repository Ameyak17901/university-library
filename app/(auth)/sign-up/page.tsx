"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";

const Page = () => {
  return (
    <AuthForm
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        universityCard: "",
        universityId: 0,
        fullName: "",
      }}
      type="SIGN_UP"
      onSubmit={signUp}
    />
  );
};

export default Page;
