import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host — RSVPs",
  robots: { index: false, follow: false },
};

export default function HostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
