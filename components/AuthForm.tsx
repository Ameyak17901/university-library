"use client";

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "./FileUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  type: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const router = useRouter();
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result?.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You signed in successfully"
          : "You signed up successfully",
      });
      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "an error ocurred",
        variant: "destructive",
      });
    }
  };

  const isSignIn = type === "SIGN_IN";
  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-2xl text-white font-semibold">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all the fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload onFileUpload={field.onChange} />
                    ) : (
                      <Input
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        className="form-input"
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to Bookwise" : "Already have an account"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
