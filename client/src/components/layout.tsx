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
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-20 rounded-t-3xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <Link href="/">
                <a className="flex items-center gap-3 group">
                  <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary-foreground/10 bg-white group-hover:border-primary-foreground/30 transition-all">
                    <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full" />
                  </div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-white">Darzi</span>
                </a>
              </Link>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                Premium garment care and bespoke tailoring service. Elevating the standard of your wardrobe since 2026.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                  <a key={platform} href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all text-xs font-bold">
                    {platform[0]}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                {['Steam Pressing', 'Dry Cleaning', 'Premium Starch', 'Expert Alterations', 'Bespoke Tailoring'].map((item) => (
                  <li key={item}>
                    <a href="/services" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                {['About Us', 'Our Craft', 'Sustainability', 'Careers', 'Become a Seller'].map((item) => (
                  <li key={item}>
                    <a href={item.toLowerCase() === 'booking' ? '/booking' : item.toLowerCase() === 'login' ? '/login' : '/about'} className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-serif font-bold text-lg mb-4">Support & Contact</h4>
              <div className="space-y-4 text-sm text-primary-foreground/70">
                <p className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] uppercase">M</span>
                  care@darzi.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] uppercase">P</span>
                  +1 (555) 234-5678
                </p>
                <p className="flex items-center gap-3 italic">
                  <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] uppercase">A</span>
                  123 Luxury Lane, Fashion District, NY
                </p>
                <div className="pt-2">
                  <a href="#" className="hover:text-white transition-colors font-bold">FAQ</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-primary-foreground/40 uppercase tracking-widest font-bold">
            <span>© 2026 Darzi Craftsmanship</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}