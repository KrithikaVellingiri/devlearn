import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { SettingsClient } from "./settings-client";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  const userName = session.user?.name || session.user?.email?.split('@')[0] || "";
  const userEmail = session.user?.email || "";

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-sans">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-2">Settings</h1>
          <p className="text-text-primary/60 text-sm">Manage your account and preferences.</p>
        </div>
        <SettingsClient initialName={userName} email={userEmail} />
      </main>
      </div>
    </div>
  );
}
