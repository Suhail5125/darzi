import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle2 } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthOpen(false);
    setLocation("/dashboard");
  };

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
            <Button 
              variant="outline" 
              onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }}
              className="ml-4 font-medium rounded-full px-6 border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              Login
            </Button>
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
                <Button 
                  className="w-full rounded-full" 
                  onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                >
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Auth Modal Overlay */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[480px] w-[95vw] min-h-[600px] flex flex-col rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl bg-white">
          <div className="relative h-40 shrink-0 bg-primary flex items-center px-10 overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:32px_32px]" />
             <div className="relative z-10 flex flex-col">
                <DialogTitle className="text-4xl font-serif font-bold text-white">
                  {authMode === 'login' ? 'Sign In' : 'Join Darzi'}
                </DialogTitle>
                <p className="text-white/60 text-sm mt-2 font-medium tracking-wide">
                  {authMode === 'login' ? 'Access your curated wardrobe' : 'Experience the pinnacle of garment care'}
                </p>
             </div>
             {authMode === 'signup' && (
               <button 
                 onClick={() => setAuthMode('login')}
                 className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
               >
                 <ArrowLeft className="h-6 w-6" />
               </button>
             )}
          </div>

          <div className="p-10 pt-8 flex-1 flex flex-col">
            <form onSubmit={handleAuth} className="flex-1 flex flex-col space-y-6">
              <div className="space-y-5 flex-1">
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/20" />
                      <input 
                        type="text" 
                        placeholder="Alexander Thorne"
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border border-primary/5 bg-primary/[0.02] focus:bg-white focus:border-primary/20 focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/20" />
                    <input 
                      type="email" 
                      placeholder="alex@darzi.com"
                      className="w-full h-14 pl-12 pr-4 rounded-2xl border border-primary/5 bg-primary/[0.02] focus:bg-white focus:border-primary/20 focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.3em] ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/20" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      className="w-full h-14 pl-12 pr-14 rounded-2xl border border-primary/5 bg-primary/[0.02] focus:bg-white focus:border-primary/20 focus:ring-8 focus:ring-primary/5 outline-none transition-all text-sm font-medium"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/20 hover:text-primary transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="shrink-0 space-y-6">
                {authMode === 'login' ? (
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border border-primary/10 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                        <CheckCircle2 className="absolute h-3 w-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="text-xs font-bold text-primary hover:text-primary/70 transition-colors underline underline-offset-4 decoration-primary/20">Forgot Password?</button>
                  </div>
                ) : (
                  <div className="px-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground leading-relaxed">I agree to the <button type="button" className="font-bold text-primary hover:underline">Terms of Service</button> and <button type="button" className="font-bold text-primary hover:underline">Privacy Policy</button></span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full h-14 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all text-base font-bold bg-primary hover:scale-[1.02] active:scale-[0.98]">
                  {authMode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    {authMode === 'login' ? (
                      <>New to the circle? <button type="button" onClick={() => setAuthMode('signup')} className="text-primary font-bold hover:text-primary/70 transition-colors underline underline-offset-8 decoration-primary/20">Join Now</button></>
                    ) : (
                      <>Already a member? <button type="button" onClick={() => setAuthMode('login')} className="text-primary font-bold hover:text-primary/70 transition-colors underline underline-offset-8 decoration-primary/20">Sign In</button></>
                    )}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

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
              <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy</a></Link>
              <Link href="/terms"><a className="hover:text-white transition-colors">Terms</a></Link>
              <Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link>
              <Link href="/faq"><a className="hover:text-white transition-colors">FAQ</a></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}