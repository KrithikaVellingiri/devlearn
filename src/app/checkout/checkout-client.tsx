"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { enrollInCourse } from "@/services/enrollments";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, Lock, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import Link from "next/link";

export function CheckoutClient({ sessionEmail }: { sessionEmail?: string | null }) {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State (simulated)
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const subtotal = items.reduce((acc, item) => acc + (item.price || 0), 0);

  const discount = items.length > 0 ? 45.00 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleSimulatedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionEmail) {
      toast.error("Authentication required");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!name.trim()) {
      toast.error("Cardholder name is required", { description: "Please enter the name on your card." });
      return;
    }
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16) {
      toast.error("Invalid card number", { description: "Please enter a valid 16-digit card number." });
      return;
    }
    if (!expiry.trim() || expiry.length < 5) {
      toast.error("Invalid expiry date", { description: "Please enter a valid MM/YY expiry date." });
      return;
    }
    if (!cvv.trim() || cvv.length < 3) {
      toast.error("Invalid CVV", { description: "Please enter a valid 3 or 4-digit CVV." });
      return;
    }

    setIsProcessing(true);

    // Artificial delay for UX realism
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;

    // Process enrollments just like the previous cart logic did
    for (const item of items) {
      try {
        const result = await enrollInCourse(sessionEmail, item.id);
        if (result.success) {
          if (result.alreadyEnrolled) {
            duplicateCount++;
          } else {
            successCount++;
          }
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
      }
    }

    setIsProcessing(false);

    if (errorCount > 0 && successCount === 0 && duplicateCount === 0) {
      toast.error("Checkout failed", {
        description: "Could not enroll in any courses. Please try again.",
        duration: 5000,
      });
      return;
    }

    // Instead of a generic toast, trigger the custom success modal
    setIsSuccess(true);
    clearCart();

    // Auto-redirect after a slightly longer delay so they can read the success message
    setTimeout(() => {
      router.push("/dashboard");
    }, 3500);
  };

  // Beautiful Success State UI
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md px-4">
        <div className="bg-surface border border-border/50 rounded-3xl p-8 sm:p-12 md:p-14 max-w-lg w-full text-center shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-success/10 rounded-full flex items-center justify-center mb-5 sm:mb-6 shrink-0">
            <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-success" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3 tracking-tight">Purchase Successful</h2>
          <p className="text-text-primary/60 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-sm mx-auto">
            Your courses have been successfully unlocked and added to your curriculum.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-text-primary/40 uppercase tracking-widest animate-pulse flex-wrap justify-center">
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Redirecting to Dashboard</span>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-extrabold text-text-primary mb-4">Your cart is empty</h2>
        <p className="text-text-primary/60 mb-8 max-w-md mx-auto">
          You need items in your cart to checkout.
        </p>
        <Link href="/courses">
          <Button variant="primary">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
        
        {/* Left Column: Payment Form */}
        <div className="flex-1 w-full order-2 lg:order-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary mb-6">Payment Details</h1>
          
          <Card className="bg-surface/40 border-border/50">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSimulatedCheckout} className="space-y-6">
                
                {/* Contact Info (Pre-filled via session) */}
                <div>
                  <h3 className="font-bold text-lg text-text-primary mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">Email Address</label>
                    <Input 
                      disabled 
                      value={sessionEmail || ""} 
                      className="bg-background/50 border-border/50 text-text-primary/50" 
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-border/50 my-6"></div>

                {/* Card Info */}
                <div>
                  <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Payment Method
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">Cardholder Name</label>
                      <Input 
                        required
                        placeholder="John Doe" 
                        className="bg-background border-border/80 focus:border-primary transition-colors"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">Card Number</label>
                      <Input 
                        required
                        placeholder="4242 4242 4242 4242" 
                        maxLength={19}
                        className="bg-background border-border/80 focus:border-primary transition-colors font-mono tracking-wider"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">Expiry Date</label>
                        <Input 
                          required
                          placeholder="MM/YY" 
                          maxLength={5}
                          className="bg-background border-border/80 focus:border-primary transition-colors font-mono"
                          value={expiry}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) {
                              setExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                            } else {
                              setExpiry(val);
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">CVV</label>
                        <Input 
                          required
                          type="password"
                          placeholder="123" 
                          maxLength={4}
                          className="bg-background border-border/80 focus:border-primary transition-colors font-mono tracking-widest"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  disabled={isProcessing}
                  className="w-full mt-8 h-14 font-bold uppercase tracking-widest text-sm text-white shadow-xl shadow-primary/20"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-3" />
                      Complete Purchase — {formatPrice(total)}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0 order-1 lg:order-2">
          <h2 className="text-xl font-bold text-text-primary mb-6 hidden lg:block">Order Summary</h2>
          <Card className="bg-surface/40 border-border/50 sticky top-24">
            <CardContent className="p-6">
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-12 bg-background rounded overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-text-primary truncate">{item.title}</h4>
                      <p className="text-xs text-text-primary/60">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-6 space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-text-primary/70">Subtotal</span>
                  <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400">Discount</span>
                    <span className="font-semibold text-cyan-400">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-border/50 pt-5 mt-5 flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-wider text-text-primary">Total</span>
                <span className="text-3xl font-extrabold text-text-primary">{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
