export const metadata = {
  title: "ثبت‌نام | نام سایت",
  description: "در این صفحه می‌توانید حساب کاربری خود را ایجاد کنید.",
  robots: "noindex",
};
export default function RegisterLayout({ children }) {
  return (
    <>
      <div className="max-w-5xl mx-auto my-24">
        <div className="w-1/2 bg-gray-200 p-12 text-stone-800 mx-auto rounded-xl shadow-md shadow-slate-300 ">
          <h2 className="text-center mb-8 text-3xl font-semibold">
            Register Form
          </h2>

          {children}
        </div>
      </div>
    </>
  );
}
