export const metadata = {
  title: "درباره ما | نام سایت",
  description: "در این صفحه می‌توانید اطلاعات شرکت را مشاهده کنید.",
  robots: "noindex",
};
export default function AboutLayout({ children }) {
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
