import React from 'react';
import { CheckoutClient } from './checkout-client';
import { Navbar } from '@/components/layout/navbar';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin?callbackUrl=/checkout");
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      <main className="flex-1 w-full relative z-10">
        <CheckoutClient sessionEmail={session.user?.email} />
      </main>
    </div>
  );
}
