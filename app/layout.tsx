import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/utils/Providers/Provider";
import type React from "react";

export const metadata: Metadata = {
  title: "CITIZEN COMPLAINTS AND ENGAGEMENT SYSTEM",
  description:
    "CITIZEN COMPLAINTS AND ENGAGEMENT SYSTEM is a platform for managing complaints and fostering citizen engagement effectively.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
