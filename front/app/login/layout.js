export const metadata = {
  title: "ورود | نام سایت",
  description: "در این صفحه می‌توانید حساب کاربری خود را ایجاد کنید.",
  robots: "noindex",
};
export default function LoginLayout({ children }) {
  return (
    <>
      <div className="max-w-5xl mx-auto my-24">
        <div className="w-1/2 bg-gray-200 p-12 text-stone-800 mx-auto rounded-xl shadow-md shadow-slate-300 ">
          {children}
        </div>
      </div>
    </>
  );
}
