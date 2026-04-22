"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { enrollInCourse } from "@/services/enrollments";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CourseGrid } from "@/components/sections/course-grid";
import { Loader2, CheckCircle2, ShoppingCart, AlertTriangle } from "lucide-react";

const recommendedCourses = [
  {
    category: "CLOUD LAB",
    title: "Kubernetes Hardening & Security",
    instructor: "Adrian Kos",
    rating: 4.8,
    reviews: 420,
    price: "$99.00",
    imageUrl: "https://images.unsplash.com/photo-1667375085698-fa3ebaf0a049?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "ARCHITECTURE",
    title: "Clean Code: Design Patterns in Go",
    instructor: "Ben H.",
    rating: 4.9,
    reviews: 845,
    price: "$74.00",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "DEVOPS",
    title: "Infrastructure as Code with Terraform",
    instructor: "Elena R.",
    rating: 4.7,
    reviews: 630,
    price: "$119.00",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1488"
  }
];

export const CartClient = () => {
  const { items, removeFromCart, clearCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen w-full bg-background" />;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const discount = items.length > 0 ? 45.00 : 0; 
  const total = Math.max(0, subtotal - discount);

  const handleCheckout = async () => {
    // Must be logged in
    if (status !== "authenticated" || !session?.user?.email) {
      toast.error("Please sign in", {
        description: "You need to be logged in to complete checkout.",
      });
      window.location.href = "/api/auth/signin";
      return;
    }

    if (items.length === 0) return;

    setIsCheckingOut(true);
    const userEmail = session.user.email;

    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;

    // Loop through cart items and enroll each
    for (const item of items) {
      try {
        const result = await enrollInCourse(userEmail, item.id);
        if (result.success) {
          if (result.alreadyEnrolled) {
            duplicateCount++;
          } else {
            successCount++;
          }
        } else {
          errorCount++;
          console.error(`Failed to enroll in ${item.title}:`, result.error);
        }
      } catch (err) {
        errorCount++;
        console.error(`Error enrolling in ${item.title}:`, err);
      }
    }

    setIsCheckingOut(false);

    // Show results
    if (errorCount > 0 && successCount === 0 && duplicateCount === 0) {
      toast.error("Checkout failed", {
        description: "Could not enroll in any courses. Please try again.",
        duration: 5000,
      });
      return;
    }

    // Build success message
    const parts: string[] = [];
    if (successCount > 0) {
      parts.push(`${successCount} course${successCount > 1 ? "s" : ""} enrolled`);
    }
    if (duplicateCount > 0) {
      parts.push(`${duplicateCount} already enrolled`);
    }
    if (errorCount > 0) {
      parts.push(`${errorCount} failed`);
    }

    if (successCount > 0) {
      toast.success("🎉 Checkout complete!", {
        description: parts.join(" · ") + ". Redirecting to your dashboard…",
        duration: 4000,
      });
    } else if (duplicateCount > 0) {
      toast("Already enrolled", {
        description: "You were already enrolled in all these courses. Redirecting to your dashboard…",
        duration: 4000,
      });
    }

    // Clear cart and redirect to dashboard
    clearCart();
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">Shopping Cart</h1>
          <p className="text-xs uppercase tracking-widest text-text-primary/60 font-semibold">
            Precision in selection • {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 mb-12 bg-surface/20 rounded-2xl border border-border/50 text-center space-y-6">
            <div className="bg-surface p-6 rounded-full border border-border">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary/50"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-text-primary/60">Looks like you haven't added any courses to your cart yet.</p>
            </div>
            <Link href="/courses">
               <Button variant="primary" size="lg" className="px-8 mt-2">Explore courses</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start pb-8">
            <div className="flex-1 w-full space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4 flex flex-col sm:flex-row gap-5 bg-surface/40 hover:bg-surface/60 transition-colors border-border/50">
                  <div className="w-full sm:w-56 aspect-[16/9] rounded-md overflow-hidden bg-background shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-between py-1">
                    <div>
                      <h3 className="font-semibold text-lg leading-snug text-white">{item.title}</h3>
                      <p className="text-sm text-text-primary/60 mt-1">Instructor: {item.instructor}</p>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-6 sm:mt-0">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        disabled={isCheckingOut}
                        className="text-xs uppercase tracking-wider font-semibold text-text-primary/60 hover:text-red-400 flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        Remove
                      </button>
                      <button className="text-xs uppercase tracking-wider font-semibold text-text-primary/60 hover:text-white flex items-center gap-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        Save to Wishlist
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end py-1 sm:min-w-[100px]">
                    <p className="font-bold text-lg text-white">${item.price.toFixed(2)}</p>
                    {item.originalPrice && (
                      <p className="text-[11px] text-text-primary/50 line-through mt-0.5">${item.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="w-full lg:w-[380px] shrink-0">
              <Card className="p-7 bg-surface/40 border-border/50 shadow-xl">
                <div className="flex items-center gap-2 mb-8 border-b border-border/50 pb-4">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                   <h2 className="font-bold text-white text-lg">Order Summary</h2>
                </div>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary/80">Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {items.length > 0 && discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400">Architect Discount</span>
                      <span className="font-semibold text-cyan-400">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mb-8 py-5 border-y border-border/50">
                  <span className="text-xs uppercase tracking-widest font-bold text-text-primary/80">Estimated Total</span>
                  <span className="text-3xl font-extrabold text-white">${total.toFixed(2)}</span>
                </div>
                
                <div className="mb-6">
                  <label className="block text-[10px] uppercase tracking-widest text-text-primary/60 font-semibold mb-3">Voucher Code</label>
                  <div className="flex gap-3">
                    <Input placeholder="ARCHITECT2024" className="bg-background/80 h-11 border-border shadow-inner font-mono text-sm uppercase placeholder:text-text-primary/30" />
                    <Button variant="secondary" className="h-11 px-6 font-bold text-xs tracking-wider">APPLY</Button>
                  </div>
                </div>

                {/* Not authenticated warning */}
                {status !== "authenticated" && (
                  <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-300/80 leading-relaxed">
                      You need to <Link href="/api/auth/signin" className="underline font-semibold text-amber-300 hover:text-amber-200">sign in</Link> to checkout.
                    </p>
                  </div>
                )}
                
                <Button 
                  size="lg" 
                  className="w-full flex items-center justify-center gap-2 group h-12 mt-4 text-base disabled:opacity-60 disabled:cursor-not-allowed" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Enrollment…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Checkout & Enroll
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </>
                  )}
                </Button>
                
                <p className="mt-8 text-center text-[9px] uppercase tracking-[0.2em] text-text-primary/40 leading-loose font-bold max-w-[280px] mx-auto">
                  Secure technical transaction encrypted with AES-256
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="w-full bg-background mt-4 pb-12">
         <CourseGrid title="Recommended for Your Stack" courses={recommendedCourses} />
      </div>
    </>
  );
};
