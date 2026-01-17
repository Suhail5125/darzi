import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, ShieldCheck, Scissors } from "lucide-react";
import { Link, useLocation } from "wouter";

// Import generated assets
import pressingImg from "@assets/generated_images/professional_clothes_pressing_service.png";
import dryCleaningImg from "@assets/generated_images/dry_cleaning_service_visual.png";
import starchImg from "@assets/generated_images/starch_service_crisp_linens.png";
import alterationImg from "@assets/generated_images/clothing_alteration_service.png";
import tailoringImg from "@assets/generated_images/bespoke_tailoring_service.png";
import washingImg from "@assets/generated_images/professional_laundry_washing_service.png";

const categories = [
  {
    id: "washing",
    title: "Eco Washing",
    description: "Gentle, eco-conscious laundry care for everyday essentials.",
    image: washingImg,
  },
  {
    id: "pressing",
    title: "Steam Pressing",
    description: "Crisp, wrinkle-free finish for your daily wear.",
    image: pressingImg,
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Eco-friendly solvent cleaning for delicate fabrics.",
    image: dryCleaningImg,
  },
  {
    id: "starch",
    title: "Premium Starch",
    description: "Signature stiffness for bed linens and dress shirts.",
    image: starchImg,
  },
  {
    id: "alteration",
    title: "Expert Alterations",
    description: "Perfect fits, hem adjustments, and repairs.",
    image: alterationImg,
  },
  {
    id: "tailoring",
    title: "Bespoke Tailoring",
    description: "Custom-made suits and dresses from scratch.",
    image: tailoringImg,
  },
];

export default function Home() {
  const [location, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("darzi_logged_in") === "true");
  }, []);

  const handleServiceClick = (serviceId: string) => {
    if (isLoggedIn) {
      setLocation(`/booking?service=${serviceId}`);
    } else {
      setLocation("/login");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col gap-12 pt-32 pb-16">
        <section className="container mx-auto px-6 md:px-12">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 italic">Hello, Alex.</h1>
              <p className="text-white/80 text-lg max-w-xl mb-8">
                Ready to refresh your wardrobe today? Your preferred master tailor is available for a consultation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button variant="secondary" className="rounded-full px-8 h-12 shadow-lg">
                    Schedule New Pick-up
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="rounded-full px-8 h-12 border-white/20 hover:bg-white/10">
                    Track Your Orders
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 scale-150">
              <Scissors className="h-64 w-64" />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary">Your Quick Services</h2>
            <Link href="/services">
              <Button variant="link" className="text-primary p-0">View all services</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => handleServiceClick(category.id)}
                className="group cursor-pointer bg-background border border-primary/5 rounded-2xl p-4 text-center hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-muted">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-serif font-bold text-primary text-sm">{category.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-12">
          <Card className="border-primary/10 bg-primary/5 overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row items-center">
              <div className="flex-1 p-8 md:p-12 space-y-4">
                <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">Member Exclusive</span>
                <h2 className="text-3xl font-serif font-bold text-primary">Complimentary Fabric Consultation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As a Darzi Gold member, you're entitled to a free fabric longevity assessment for your luxury garments.
                </p>
                <Button className="rounded-full px-8">Claim Benefit</Button>
              </div>
              <div className="flex-1 w-full md:w-1/2 aspect-video md:aspect-auto">
                <img 
                  src="https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=80" 
                  alt="Fabric Consultation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-multiply" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 tracking-wide">
              EST. 2026
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 tracking-tight leading-tight">
              The Art of <br />
              <span className="italic font-light">Impeccable</span> Wear
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the finest garment care, from precision dry cleaning to bespoke tailoring. We treat every thread with respect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105"
                onClick={() => handleServiceClick("washing")}
              >
                Book a Service
              </Button>
              <Link href="/services">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Curated Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Select a category to begin your journey to garment perfection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group cursor-pointer" onClick={() => handleServiceClick(category.id)}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 shadow-md hover:shadow-xl transition-all duration-500">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-background/90 backdrop-blur-md p-4 rounded-xl translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-serif text-xl font-bold text-primary mb-1 flex items-center justify-between">
                        {category.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features / Trust Section */}
      <section className="bg-primary/5 py-24 rounded-3xl mx-4 lg:mx-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-lg mb-6 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">48-Hour Turnaround</h3>
              <p className="text-muted-foreground max-w-xs">Swift service without compromising quality. Get your clothes back fresh and ready.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-lg mb-6 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Fabric Care Guarantee</h3>
              <p className="text-muted-foreground max-w-xs">We treat every fabric with specialized care techniques to ensure longevity.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-lg mb-6 text-primary">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Master Tailors</h3>
              <p className="text-muted-foreground max-w-xs">Our team consists of seasoned professionals with decades of experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
}