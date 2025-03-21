import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { ToastContainer } from "react-toastify";

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
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
