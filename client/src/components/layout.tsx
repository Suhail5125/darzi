import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scissors, Home, ClipboardList, User, PlusCircle, ShoppingBag, ShoppingCart } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("darzi_logged_in") === "true";
    setIsLoggedIn(status);
  }, [location]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans pb-20 md:pb-0">
      <header className="fixed top-0 z-50 w-full transition-all duration-300">
        <div className="mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors bg-background/50 backdrop-blur-sm">
                 <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Darzi</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-background/50 backdrop-blur-md px-8 py-2 rounded-full border border-primary/5 shadow-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href={isLoggedIn ? "/products" : "/services"}>{isLoggedIn ? "Products" : "Services"}</NavLink>
            <NavLink href="/about">About</NavLink>
            
            {isLoggedIn && (
              <>
                <NavLink href="/cart">Cart</NavLink>
                <NavLink href="/account">Account</NavLink>
              </>
            )}
            
            {!isLoggedIn ? (
              <Link href="/login">
                <Button variant="outline" className="ml-4 font-medium rounded-full px-6 border-primary/20 hover:bg-primary/5 hover:text-primary">
                  Login
                </Button>
              </Link>
            ) : (
              <Button 
                variant="ghost" 
                className="ml-4 h-10 w-10 rounded-full p-0 overflow-hidden border border-primary/20"
                onClick={() => { localStorage.removeItem("darzi_logged_in"); window.location.href="/"; }}
              >
                <div className="bg-primary/10 w-full h-full flex items-center justify-center text-primary font-bold">A</div>
              </Button>
            )}

            <Link href="/booking">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Book Service
              </Button>
            </Link>
          </nav>

          {/* Mobile Profile Icon */}
          <div className="md:hidden flex items-center gap-4">
             {isLoggedIn && (
               <Link href="/dashboard">
                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">A</div>
               </Link>
             )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/"><a className="text-lg font-medium">Home</a></Link>
                  <Link href="/services"><a className="text-lg font-medium">Services</a></Link>
                  <Link href="/about"><a className="text-lg font-medium">About</a></Link>
                  <Link href="/booking"><a className="text-lg font-medium">Book Now</a></Link>
                  {!isLoggedIn ? (
                    <Link href="/login"><Button className="w-full rounded-full">Login</Button></Link>
                  ) : (
                    <Button variant="outline" className="w-full rounded-full" onClick={() => { localStorage.removeItem("darzi_logged_in"); window.location.href="/"; }}>Logout</Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      {isLoggedIn && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t h-20 px-6 flex items-center justify-between z-50">
          <Link href="/">
            <a className={`flex flex-col items-center gap-1 ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Home className="h-6 w-6" />
              <span className="text-[10px] font-medium">Home</span>
            </a>
          </Link>
          <Link href="/products">
            <a className={`flex flex-col items-center gap-1 ${location === '/products' ? 'text-primary' : 'text-muted-foreground'}`}>
              <ShoppingBag className="h-6 w-6" />
              <span className="text-[10px] font-medium">Products</span>
            </a>
          </Link>
          <Link href="/booking">
            <a className="flex flex-col items-center gap-1 -translate-y-4">
              <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 ring-4 ring-background">
                <PlusCircle className="h-8 w-8" />
              </div>
            </a>
          </Link>
          <Link href="/cart">
            <a className={`flex flex-col items-center gap-1 ${location === '/cart' ? 'text-primary' : 'text-muted-foreground'}`}>
              <ShoppingCart className="h-6 w-6" />
              <span className="text-[10px] font-medium">Cart</span>
            </a>
          </Link>
          <Link href="/account">
            <a className={`flex flex-col items-center gap-1 ${location === '/account' ? 'text-primary' : 'text-muted-foreground'}`}>
              <User className="h-6 w-6" />
              <span className="text-[10px] font-medium">Account</span>
            </a>
          </Link>
        </nav>
      )}

      <footer className="hidden md:block border-t bg-primary/5 py-20 px-6 md:px-12">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary/10 bg-background">
                 <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full" />
              </div>
              <span className="font-serif text-2xl font-bold text-primary tracking-tight">Darzi</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Elevating the standard of garment care through precision, passion, and a commitment to timeless quality.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Premium Dry Cleaning</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Bespoke Tailoring</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Expert Alterations</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Steam Pressing</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Eco Washing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">About Darzi</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Our Craftsmanship</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sustainability</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
             <h4 className="font-serif font-bold text-lg mb-6">Experience Darzi</h4>
             <p className="text-sm text-muted-foreground mb-4 italic">Join our newsletter for exclusive fabric care tips and first access to new collections.</p>
             <div className="flex gap-2">
               <input type="email" placeholder="Email" className="bg-background border border-primary/10 rounded-full px-4 py-2 text-xs flex-1 outline-none focus:border-primary/30" />
               <Button size="sm" className="rounded-full">Join</Button>
             </div>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <span>© 2026 Darzi Craftsmanship</span>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}