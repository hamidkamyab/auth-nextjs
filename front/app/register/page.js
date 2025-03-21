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
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const baseSchema = z.object({
  name: z
    .string()
    .nonempty("نام و نام خانوادگی نمی‌تواند خالی باشد.")
    .min(3, "نام و نام خانوادگی نمی تواند کمتر از 3 حرف باشد")
    .max(128, "نام و نام خانوادگی نمی تواند بزرگتر از 50 حرف باشد")
    .regex(/^[^\d]+$/, "نام و نام خانوادگی نباید شامل عدد باشد"),
  email: z
    .string()
    .nonempty("ایمیل نمی‌تواند خالی باشد.")
    .email("فرمت ایمیل صحیح نمی باشد"),
  password: z
    .string()
    .nonempty("رمزعبور نمی‌تواند خالی باشد.")
    .min(8, "پسورد نمی تواند کمتر از 8 کاراکتر باشد")
    .max(255, "پسورد نمی تواند بیشتر از 255 کاراکتر باشد")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "رمز عبور باید شامل حداقل یک حرف، یک عدد و یک کاراکتر خاص باشد"
    ),
  c_password: z.string().nonempty("تکرار رمزعبور نمی‌تواند خالی باشد."),
});
const formSchema = baseSchema.refine(
  (data) => data.password === data.c_password,
  {
    message: "رمز عبور و تأیید رمز عبور یکسان نیستند",
    path: ["c_password"],
  }
);

export default function Register() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
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
      let response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      response = await response.json();
      if (response.status < 300) {
        toast.success("ثبت نام با موفقیت انجام شد", {
          position: "bottom-right",
        });
        setTimeout(() => {
          redirect("/");
        }, 200);
      } else {
        const keys = Object.keys(baseSchema.shape);
        console.log(response);
        Object.entries(response.data).forEach(([field, messages]) => {
          if (keys.includes(field)) {
            setError(field, {
              type: "server",
              message: messages[0],
            });
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormProvider {...methods}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">FullName</FormLabel>
                <div
                  className={`${
                    errors.name ? "after:w-2 after:!bg-rose-500" : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      className={` ${
                        errors.name
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
            name="c_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-stone-600">
                  Confirm Password
                </FormLabel>
                <div
                  className={`${
                    errors.c_password
                      ? "after:w-2 after:!bg-rose-500"
                      : "after:w-0"
                  } relative after:content-[''] after:block after:w-0 shadow-md after:rounded-s-sm after:transition-all after:duration-500  rounded-sm after:h-full after:absolute after:left-0 after:top-0 after:bg-transparent`}
                >
                  <FormControl>
                    <Input
                      type="password"
                      className={` ${
                        errors.c_password
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
