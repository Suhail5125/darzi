import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export default function Products() {
  return (
    <div className="pt-8 md:pt-32 pb-16 min-h-screen container mx-auto px-6 md:px-12">
      {/* Mobile Search & Filter Header (App-like) */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-primary italic">Shop</h1>
          <Button variant="ghost" size="icon" className="text-primary">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-primary/5 border-none rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["All", "Detergents", "Fabric Softeners", "Toolkits", "Sprays"].map((tag) => (
            <Button 
              key={tag} 
              variant="outline" 
              size="sm" 
              className="rounded-full whitespace-nowrap border-primary/10 text-xs px-4"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <h1 className="text-4xl font-serif font-bold text-primary mb-8">Premium Products</h1>
        <p className="text-muted-foreground mb-12">Curated selection of garment care products for our members.</p>
      </div>
      
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
