import { Navbar } from "@/components/navbar_component/navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: "400",
  display: "swap",
});
// export const metadata = {
//   title: "Cộng đồng Flutter Việt Nam",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${roboto.className} bg-slate-100`}
      >
        <Toaster position="top-right" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
