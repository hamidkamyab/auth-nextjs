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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, "نام و نام خانوادگی نمی تواند کمتر از 3 حرف باشد")
    .max(128, "نام و نام خانوادگی نمی تواند بزرگتر از 50 حرف باشد")
    .regex(/^[^\d]+$/, "نام و نام خانوادگی نباید شامل عدد باشد"),
  email: z.string().email("فرمت ایمیل صحیح نمی باشد"),
  password: z
    .string()
    .min(8, "پسورد نمی تواند کمتر از 8 کاراکتر باشد")
    .max(255, "پسورد نمی تواند بیشتر از 255 کاراکتر باشد")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "رمز عبور باید شامل حداقل یک حرف، یک عدد و یک کاراکتر خاص باشد"
    ),
});

export default function Register() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-center mb-4 text-3xl font-semibold">
          Register Form
        </h2>
        <FormProvider {...methods}>
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">FullName</FormLabel>
                <FormControl>
                  <Input
                    className="text-stone-800 font-medium"
                    placeholder="Full Name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="text-stone-800 font-medium"
                    placeholder="info@example.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormDescription className="text-stone-400 text-xs">
                    (پسورد باید شامل حروف و عدد و کاراکتر خاص باشد)
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    className="text-stone-800 font-medium"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-stone-800 font-medium"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-green-600 mt-4 hover:bg-green-700 transition-all duration-200 focus:ring-2 ring-emerald-400"
          >
            Register
          </Button>
        </FormProvider>
      </form>
    </>
  );
}
