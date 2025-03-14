"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";

export default function Login() {
  const methods = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <>
      <div className="flex flex-col  gap-4">
        <h2 className="text-center mb-4 text-3xl font-semibold">Login Form</h2>
        <FormProvider {...methods}>
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="text-stone-800 font-medium"
                    placeholder="info@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-stone-400 text-xs">
                  This is your Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-stone-800 font-medium"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-stone-400 text-xs">
                  This is your Password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-green-600 mt-4 hover:bg-green-700 transition-all duration-200 focus:ring-2 ring-emerald-400">
            Register
          </Button>
        </FormProvider>
      </div>
    </>
  );
}
