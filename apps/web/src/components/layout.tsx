import React from "react";
import { Link, useLocation } from "wouter";
import { Button, Sheet, SheetContent, SheetTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@darzi/shared-ui";
import { Menu, Mail, Lock, Eye, EyeOff, User, ArrowLeft, CheckCircle2, ShoppingCart, Minus, Plus, Trash2, MapPin, Tag, DollarSign, Truck, ChevronDown, Settings, LogOut, Bell, CreditCard, Shield, HelpCircle, Search } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";
import PostLoginHome from "@/pages/post-login-home";

const AuthContext = React.createContext<{ 
  openLoginModal: () => void;
  isLoggedIn: boolean;
  logout: () => void;
} | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

// Cart data
const cartItems = [
  {
    id: 1,
    service: "Steam Pressing",
    description: "Professional steam pressing for dress shirts",
    quantity: 3,
    price: 12.00
  },
  {
    id: 2,
    service: "Dry Cleaning",
    description: "Eco-friendly dry cleaning for suits",
    quantity: 1,
    price: 25.00
  }
];

const AccountSidePanel = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-xl font-bold">
            A
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-primary">Alex Johnson</h2>
            <p className="text-xs text-muted-foreground">alex@example.com</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Profile */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4" />
            <h3 className="font-medium text-sm">Profile</h3>
          </div>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Edit Profile
          </Button>
        </div>

        {/* Addresses */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <h3 className="font-medium text-sm">Addresses</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Manage delivery addresses</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Manage Addresses
          </Button>
        </div>

        {/* Payment Methods */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4" />
            <h3 className="font-medium text-sm">Payment</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Cards & payment methods</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Manage Payment
          </Button>
        </div>

        {/* Notifications */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4" />
            <h3 className="font-medium text-sm">Notifications</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Order updates & promotions</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Settings
          </Button>
        </div>

        {/* Privacy & Security */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" />
            <h3 className="font-medium text-sm">Privacy & Security</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Password & security settings</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Security Settings
          </Button>
        </div>

        {/* Help & Support */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-4 w-4" />
            <h3 className="font-medium text-sm">Help & Support</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">FAQ, contact support</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Get Help
          </Button>
        </div>

        {/* App Settings */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4" />
            <h3 className="font-medium text-sm">App Settings</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Language, theme, preferences</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            App Preferences
          </Button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 py-4">
          <a href="#" className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition-colors">
            f
          </a>
          <a href="#" className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold hover:bg-pink-700 transition-colors">
            ig
          </a>
          <a href="#" className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold hover:bg-gray-800 transition-colors">
            X
          </a>
          <a href="#" className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold hover:bg-green-700 transition-colors">
            W
          </a>
        </div>
      </div>

      {/* Logout - Fixed at bottom */}
      <div className="border-t p-6">
        <Button 
          variant="destructive" 
          className="w-full h-10 rounded-lg"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

const CartSidePanel = () => {
  const [tipOpen, setTipOpen] = React.useState(false);
  const [instructionsOpen, setInstructionsOpen] = React.useState(false);
  const [selectedTip, setSelectedTip] = React.useState<number | null>(null);
  const [customTip, setCustomTip] = React.useState('');
  const [showCustomTip, setShowCustomTip] = React.useState(false);
  const [selectedInstructions, setSelectedInstructions] = React.useState<string[]>([]);
  const [customInstruction, setCustomInstruction] = React.useState('');
  const [showCustomInstruction, setShowCustomInstruction] = React.useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tip = selectedTip || 0;
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + tip + deliveryFee + tax;

  const instructionOptions = [
    "Leave with security",
    "Leave at the door", 
    "Do not ring bell",
    "Beware of pets"
  ];

  const toggleInstruction = (instruction: string) => {
    setSelectedInstructions(prev => 
      prev.includes(instruction) 
        ? prev.filter(i => i !== instruction)
        : [...prev, instruction]
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-serif font-bold text-primary">Cart ({cartItems.length})</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 cart-scrollable">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-primary/10 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-primary text-sm">{item.service}</h3>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <h3 className="font-medium text-sm">Address</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2">123 Main Street, Apt 4B<br />New York, NY 10001</p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            Change
          </Button>
        </div>

        {/* Coupons */}
        <div className="border border-primary/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-4 w-4" />
            <h3 className="font-medium text-sm">Coupon</h3>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Code"
              className="flex-1 px-2 py-1 text-xs border border-primary/20 rounded focus:outline-none focus:border-primary"
            />
            <Button size="sm" className="h-8 text-xs">Apply</Button>
          </div>
        </div>

        {/* Tip Accordion */}
        <Collapsible open={tipOpen} onOpenChange={setTipOpen}>
          <CollapsibleTrigger asChild>
            <button className="w-full border border-primary/10 rounded-lg p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-sm">Tip (${tip.toFixed(2)})</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${tipOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="border border-primary/10 rounded-lg p-4 space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[3, 5, 10].map((amount) => (
                  <Button 
                    key={amount}
                    variant={selectedTip === amount && !showCustomTip ? "default" : "outline"} 
                    size="sm" 
                    className="h-8 text-xs whitespace-nowrap flex-shrink-0"
                    onClick={() => {
                      setSelectedTip(amount);
                      setShowCustomTip(false);
                      setCustomTip('');
                    }}
                  >
                    ${amount}
                  </Button>
                ))}
                <Button 
                  variant={showCustomTip ? "default" : "outline"} 
                  size="sm" 
                  className="h-8 text-xs whitespace-nowrap flex-shrink-0"
                  onClick={() => setShowCustomTip(true)}
                >
                  Custom
                </Button>
              </div>
              {showCustomTip && (
                <input 
                  type="number" 
                  placeholder="Enter custom amount"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value);
                    if (e.target.value) {
                      setSelectedTip(parseFloat(e.target.value) || 0);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  autoFocus
                />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Instructions Accordion */}
        <Collapsible open={instructionsOpen} onOpenChange={setInstructionsOpen}>
          <CollapsibleTrigger asChild>
            <button className="w-full border border-primary/10 rounded-lg p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span className="font-medium text-sm">Instructions ({selectedInstructions.length + (customInstruction ? 1 : 0)})</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${instructionsOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="border border-primary/10 rounded-lg p-4 space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {instructionOptions.map((instruction) => (
                  <Button 
                    key={instruction}
                    variant={selectedInstructions.includes(instruction) ? "default" : "outline"} 
                    size="sm" 
                    className="h-8 text-xs whitespace-nowrap flex-shrink-0"
                    onClick={() => toggleInstruction(instruction)}
                  >
                    {instruction}
                  </Button>
                ))}
                <Button 
                  variant={showCustomInstruction ? "default" : "outline"} 
                  size="sm" 
                  className="h-8 text-xs whitespace-nowrap flex-shrink-0"
                  onClick={() => setShowCustomInstruction(!showCustomInstruction)}
                >
                  Special Instructions
                </Button>
              </div>
              {showCustomInstruction && (
                <textarea 
                  placeholder="Enter special instructions..."
                  value={customInstruction}
                  onChange={(e) => setCustomInstruction(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                  rows={3}
                  autoFocus
                />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Order Summary - Fixed at bottom */}
      <div className="border-t p-6 space-y-3">
        <h3 className="font-serif font-bold text-primary">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tip</span>
            <span>${tip.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-primary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Button className="w-full h-10 rounded-lg">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    setLocation("/dashboard");
  };

  const handleDirectLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    setLocation("/dashboard");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLocation("/");
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
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
    <AuthContext.Provider value={{ openLoginModal, isLoggedIn, logout }}>
      <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="fixed top-0 z-50 w-full transition-all duration-300">
        <div className="mx-auto px-6 md:px-12 h-20 flex items-center relative">
          <Link href={isLoggedIn ? "/dashboard" : "/"}>
            <a className="flex items-center gap-3 group">
              <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors bg-background/50 backdrop-blur-sm">
                 <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Darzi</span>
            </a>
          </Link>

          {/* Centered Search, Location for logged in users - Desktop only */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-80 pl-12 pr-4 py-3 rounded-full border border-primary/20 focus:border-primary focus:outline-none bg-background/50 backdrop-blur-sm text-sm"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Downtown</span>
              </div>
            </div>
          )}

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-background/50 backdrop-blur-md px-8 py-2 rounded-full border border-primary/5 shadow-sm ml-auto">
            {isLoggedIn ? (
              <>
                <NavLink href="/dashboard">Home</NavLink>
                <NavLink href="/explore">Explore</NavLink>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-0 h-auto">
                      Cart
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-96 p-0">
                    <CartSidePanel />
                  </SheetContent>
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="ml-4 text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-0 h-auto">
                      Account
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-96 p-0">
                    <AccountSidePanel onLogout={logout} />
                  </SheetContent>
                </Sheet>
                <Button className="rounded-full h-10 w-10 p-0 ml-4">
                  <Plus className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/about">About</NavLink>
                <Button 
                  variant="outline" 
                  onClick={openLoginModal}
                  className="ml-4 font-medium rounded-full px-6 border-primary/20 hover:bg-primary/5 hover:text-primary"
                >
                  Login
                </Button>
              </>
            )}
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
                {isLoggedIn ? (
                  <>
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-primary/20 focus:border-primary focus:outline-none bg-background text-sm"
                      />
                    </div>
                    {/* Mobile Location */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Downtown</span>
                      </div>
                      <Button className="rounded-full h-10 w-10 p-0">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <Link href="/dashboard">
                      <a className="text-lg font-medium">Home</a>
                    </Link>
                    <Link href="/explore">
                      <a className="text-lg font-medium">Explore</a>
                    </Link>
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="text-lg font-medium text-left">Cart</button>
                      </SheetTrigger>
                      <SheetContent className="w-full p-0">
                        <CartSidePanel />
                      </SheetContent>
                    </Sheet>
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="text-lg font-medium text-left">Account</button>
                      </SheetTrigger>
                      <SheetContent className="w-full p-0">
                        <AccountSidePanel onLogout={logout} />
                      </SheetContent>
                    </Sheet>
                  </>
                ) : (
                  <>
                    <Link href="/">
                      <a className="text-lg font-medium">Home</a>
                    </Link>
                    <Link href="/services">
                      <a className="text-lg font-medium">Services</a>
                    </Link>
                    <Link href="/about">
                      <a className="text-lg font-medium">About</a>
                    </Link>
                    <Button 
                      className="w-full rounded-full" 
                      onClick={openLoginModal}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Auth Modal Overlay */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[480px] w-[95vw] max-h-[90vh] flex flex-col rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl bg-white">
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
          </div>

          <div className="p-10 pt-8 flex-1 overflow-y-auto">
            <form onSubmit={handleAuth} className="flex flex-col space-y-6">
              <div className="space-y-5">
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

              <div className="space-y-6">
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
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border border-primary/10 checked:bg-primary checked:border-primary transition-all cursor-pointer" required />
                          <CheckCircle2 className="absolute h-3 w-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">I agree to the <a href="/terms" className="font-bold text-primary hover:underline" target="_blank">Terms of Service</a> and <a href="/privacy" className="font-bold text-primary hover:underline" target="_blank">Privacy Policy</a></span>
                      </label>
                    </div>
                )}

                <Button type="submit" className="w-full h-14 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all text-base font-bold bg-primary hover:scale-[1.02] active:scale-[0.98]">
                  {authMode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}
                </Button>
                
                {/* Direct Login Button for Testing */}
                <Button 
                  type="button" 
                  onClick={handleDirectLogin}
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-primary/20 text-primary hover:bg-primary/5 text-base font-bold"
                >
                  Direct Login (Skip Auth)
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
        {isLoggedIn && location === "/dashboard" ? <PostLoginHome /> : children}
      </main>
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-20 rounded-t-3xl">
        <div className="px-6 md:px-12">
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/our-craft" className="hover:text-white transition-colors">Our Craft</a></li>
                <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/become-seller" className="hover:text-white transition-colors">Become a Seller</a></li>
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
                  <a href="/faq" className="hover:text-white transition-colors font-bold">FAQ</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-primary-foreground/40 uppercase tracking-widest font-bold">
            <span>© 2026 Darzi Craftsmanship</span>
            <div className="flex gap-8">
              <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy</a></Link>
              <Link href="/terms"><a className="hover:text-white transition-colors">Terms</a></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </AuthContext.Provider>
  );
}