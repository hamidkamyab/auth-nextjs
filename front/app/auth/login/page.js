"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Routes } from "@/router/Routes";
import useAuthStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("ایمیل نمی‌تواند خالی باشد.")
    .email("ایمیل نامعتبر است"),
  password: z
    .string({ required_error: "رمزعبور نمی تواند خالی باشد." })
    .nonempty("رمزعبور نمی‌تواند خالی باشد.")
    .min(8, "رمزعبور نمی تواند کمتر از 8 کاراکتر باشد"),
});

export default function Login() {
  const { setAuth } = useAuthStore();
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
    setError,
  } = methods;

  const onSubmit = async (data) => {
    try {
      let response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      response = await response.json();
      if (response.status < 300) {
        setAuth(true);
        toast.success("با موفقیت وارد شدید", {
          position: "bottom-right",
        });

        setTimeout(() => {
          redirect(Routes.home);
        }, 400);
      } else {
        const keys = Object.keys(formSchema.shape);
        Object.entries(response.data).forEach(([field, messages]) => {
          if (keys.includes(field)) {
            if (Array.isArray(messages)) {
              setError(field, {
                type: "server",
                message: messages[0],
              });
            }
          } else {
            toast.error(messages[0], {
              position: "bottom-right",
            });
          }
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
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
                      type="text"
                      className={` ${
                        errors.email
                          ? "!border-rose-500 focus:!border-rose-500"
                          : "border-transparent focus:!border-stone-800"
                      } text-stone-800 relative rounded-sm focus-visible:!ring-offset-0 focus-visible:!ring-0 !border transition-all duration-500 `}
                      placeholder="info@example.com"
                      {...field}
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
