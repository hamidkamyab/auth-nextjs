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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { POST } from "../api/login/route";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "پسورد نمی تواند کمتر از 8 کاراکتر باشد"),
});

export default function Login() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log("onSubmit ~~~~~~~>", data);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Response ----->", await response.json());
  };

  return (
    <>
      <h2 className="text-center mb-8 text-3xl font-semibold">Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-8">
        <FormProvider {...methods}>
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">Email</FormLabel>
                <div
                  className={`${
                    errors.email ? "after:w-2 after:!bg-rose-500" : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      type="email"
                      className={` ${
                        errors.email
                          ? "!border-rose-500 focus:!border-rose-500"
                          : "border-transparent focus:!border-stone-800"
                      } text-stone-800 relative rounded-sm focus-visible:!ring-offset-0 focus-visible:!ring-0 !border transition-all duration-500 `}
                      placeholder="info@example.com"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">Password</FormLabel>
                <div
                  className={`${
                    errors.password
                      ? "after:w-2 after:!bg-rose-500"
                      : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      type="password"
                      className={` ${
                        errors.password
                          ? "!border-rose-500 focus:!border-rose-500"
                          : "border-transparent focus:!border-stone-800"
                      } text-stone-800 relative rounded-sm focus-visible:!ring-offset-0 focus-visible:!ring-0 !border transition-all duration-500 `}
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-green-600 mt-4 hover:bg-green-700 transition-all duration-200 focus:ring-2 ring-emerald-400"
          >
            Login
          </Button>
        </FormProvider>
      </form>
    </>
  );
}
