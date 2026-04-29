import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { CloudLabClient } from "./cloudlab-client";

export const dynamic = "force-dynamic";

export default async function CloudLabPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-2">CloudLab</h1>
          <p className="text-text-primary/60 text-sm">Practice coding challenges in a hands-on environment.</p>
        </div>
        <CloudLabClient />
      </main>
    </div>
  );
}
