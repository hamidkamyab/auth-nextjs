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

const formSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تأیید رمز عبور یکسان نیستند",
    path: ["confirmPassword"],
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
      <h2 className="text-center mb-8 text-3xl font-semibold">Register Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormProvider {...methods}>
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">FullName</FormLabel>
                <div
                  className={`${
                    errors.fullname
                      ? "after:w-2 after:!bg-rose-500"
                      : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      className={` ${
                        errors.fullname
                          ? "!border-rose-500 focus:!border-rose-500"
                          : "border-transparent focus:!border-stone-800"
                      } text-stone-800 relative rounded-sm focus-visible:!ring-offset-0 focus-visible:!ring-0 !border transition-all duration-500 `}
                      placeholder="Full Name..."
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="text-rose-400 text-xs font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
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
                      {...field}
                    />
                  </FormControl>
                </div>
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
                  <FormLabel className="text-stone-600">Password</FormLabel>
                  <FormDescription className="text-stone-500 text-xs">
                    (پسورد باید شامل حروف و عدد و کاراکتر خاص باشد)
                  </FormDescription>
                </div>
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

          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">
                  Confirm Password
                </FormLabel>
                <div
                  className={`${
                    errors.confirmPassword
                      ? "after:w-2 after:!bg-rose-500"
                      : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      type="password"
                      className={` ${
                        errors.confirmPassword
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
            Register
          </Button>
        </FormProvider>
      </form>
    </>
  );
}
