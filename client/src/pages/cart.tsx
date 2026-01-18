import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  return (
    <div className="pt-32 pb-16 min-h-screen container mx-auto px-6 md:px-12 text-center">
      <div className="max-w-md mx-auto py-20">
        <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any premium products yet.</p>
        <Link href="/products">
          <Button className="rounded-full px-8 h-12">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
