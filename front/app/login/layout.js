export const metadata = {
  title: "ورود | نام سایت",
  description: "در این صفحه می‌توانید حساب کاربری خود را ایجاد کنید.",
  robots: "noindex",
};
export default function RootLayout({ children }) {
  return (
    <>
      <div className="max-w-5xl mx-auto my-24">
        <div className="w-1/2 bg-slate-800 p-12 text-white mx-auto rounded-md shadow-lg shadow-slate-400 ">
          {children}
        </div>
      </div>
    </>
  );
}
