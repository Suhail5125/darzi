import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scissors } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-background font-sans">
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
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/about">About</NavLink>
            <Link href="/login">
              <Button variant="outline" className="ml-4 font-medium rounded-full px-6 border-primary/20 hover:bg-primary/5 hover:text-primary">
                Login
              </Button>
            </Link>
            <Link href="/booking">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Book Service
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/">
                  <a className="text-lg font-medium">Home</a>
                </Link>
                <Link href="/services">
                  <a className="text-lg font-medium">Services</a>
                </Link>
                <Link href="/about">
                  <a className="text-lg font-medium">About</a>
                </Link>
                <Link href="/booking">
                  <a className="text-lg font-medium">Book Now</a>
                </Link>
                 <Link href="/login">
                  <Button className="w-full rounded-full">Login</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-[#1A2E44] text-white pt-24 pb-12 rounded-t-[3.5rem] mx-0 mt-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
            <div className="space-y-8">
              <Link href="/">
                <a className="flex items-center gap-3 group">
                  <div className="h-12 w-12 relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-white/30 transition-all">
                    <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full opacity-90 group-hover:opacity-100" />
                  </div>
                  <span className="font-serif text-3xl font-bold tracking-tight text-white">Darzi</span>
                </a>
              </Link>
              <p className="text-white/50 text-base leading-relaxed max-w-xs">
                Redefining garment care through the lens of luxury and precision. Your wardrobe, curated and preserved for generations.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                  <a key={platform} href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
                    <span className="sr-only">{platform}</span>
                    <div className="w-4 h-4 bg-current rounded-sm" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-xl mb-8 text-white underline underline-offset-8 decoration-white/10">Services</h4>
              <ul className="space-y-4 text-white/50">
                {['Premium Dry Cleaning', 'Bespoke Tailoring', 'Expert Alterations', 'Steam Pressing', 'Eco Washing'].map((item) => (
                  <li key={item}>
                    <a href="/services" className="hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-white/20 rounded-full group-hover:w-2 group-hover:bg-white transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-xl mb-8 text-white underline underline-offset-8 decoration-white/10">Company</h4>
              <ul className="space-y-4 text-white/50">
                {['Our Story', 'Craftsmanship', 'Sustainability', 'Concierge Service', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="/about" className="hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-white/20 rounded-full group-hover:w-2 group-hover:bg-white transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="font-serif font-bold text-xl mb-4 text-white">Newsletter</h4>
              <p className="text-sm text-white/50 mb-6 italic leading-relaxed">Join for exclusive fabric care insights and first access to bespoke events.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all" 
                />
                <Button className="w-full rounded-xl bg-white text-[#1A2E44] hover:bg-white/90 font-bold transition-all h-12">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 uppercase tracking-[0.2em] font-medium">
            <div className="flex items-center gap-2">
              <span>© 2026 Darzi Craftsmanship</span>
              <span className="hidden md:inline text-white/10">•</span>
              <span>All Rights Reserved</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}