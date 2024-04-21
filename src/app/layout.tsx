import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { CSPostHogProvider } from "./_analytics/provider";
import { getAuthSession } from "@/lib/auth";

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  authModal, //modal
}: {
  children: React.ReactNode;
  authModal: React.ReactNode; //implement modal
}) {
  const session = await getAuthSession();
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          <CSPostHogProvider auth={session}>
            {/* @ts-expect-error server component */}
            <Navbar />

            {authModal}

            <div className="container max-w-7xl mx-auto h-full pt-12">
              {children}
            </div>
          </CSPostHogProvider>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
