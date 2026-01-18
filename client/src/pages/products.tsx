import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Products() {
  return (
    <div className="pt-32 pb-16 min-h-screen container mx-auto px-6 md:px-12">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Premium Products</h1>
      <p className="text-muted-foreground mb-12">Curated selection of garment care products for our members.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-primary/10 rounded-2xl p-6 bg-card">
            <div className="aspect-square bg-muted rounded-xl mb-4" />
            <h3 className="font-serif font-bold text-xl mb-2">Luxury Detergent {i}</h3>
            <p className="text-sm text-muted-foreground mb-4">Specialized formula for delicate fabrics.</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">$45.00</span>
              <Button size="sm" className="rounded-full">Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
