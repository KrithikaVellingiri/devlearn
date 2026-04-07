import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { CartClient } from "./cart-client";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CartClient />
      </main>
      <Footer />
    </div>
  );
}
