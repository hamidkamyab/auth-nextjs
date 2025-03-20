import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Auth Service",
  description: "Auth Service Api",
};

export default function RootLayout({ children }) {
  const items = [
    {
      key: 1,
      label: <span className="hover:bg-blue-300">Home</span>,
    },
    {
      key: 2,
      label: "Register",
    },
    {
      key: 3,
      label: "login",
    },
    {
      key: 4,
      label: "About",
    },
  ];
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
function ClientWrapper({ children }) {
  return <>{children}</>;
}
