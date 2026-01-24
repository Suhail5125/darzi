import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, ShieldCheck, ChevronDown, CheckCircle2, Ruler, Wind, Sparkles } from "lucide-react";
import { Link } from "wouter";

// Import generated assets
import pressingImg from "@assets/generated_images/professional_clothes_pressing_service.png";
import dryCleaningImg from "@assets/generated_images/dry_cleaning_service_visual.png";
import starchImg from "@assets/generated_images/starch_service_crisp_linens.png";
import alterationImg from "@assets/generated_images/clothing_alteration_service.png";
import tailoringImg from "@assets/generated_images/bespoke_tailoring_service.png";
import washingImg from "@assets/generated_images/professional_laundry_washing_service.png";
import whyChooseImg from "../assets/images/why-choose.jpg";

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

const processSteps = [
  {
    title: "Collection",
    description: "Schedule a pickup or drop off your garments at our boutique.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "Inspection",
    description: "Master artisans examine fabric type and identify specific needs.",
    icon: <Ruler className="h-6 w-6" />,
  },
  {
    title: "Expert Care",
    description: "Precision cleaning or tailoring using premium techniques.",
    icon: <Wind className="h-6 w-6" />,
  },
  {
    title: "Perfect Return",
    description: "Garments are hand-delivered, pristine and ready for wear.",
    icon: <Sparkles className="h-6 w-6" />,
  },
];

const testimonials = [
  {
    name: "Alexander Reed",
    role: "CEO, Reed Capital",
    content: "Darzi is the only service I trust with my bespoke Italian suits. Their attention to detail is truly unmatched in the city.",
  },
  {
    name: "Sarah Jenkins",
    role: "Fashion Stylist",
    content: "The starch service for my linens is incredible. Everything comes back with that signature crispness you only find at 5-star hotels.",
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    content: "Their alterations saved my favorite vintage coat. You can't even see the repairs. Masterful craftsmanship.",
  },
];

export default function Home() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-grid');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-16 pt-[16px] pb-[16px]">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-multiply" />
        
        <div className="container mx-auto px-4 relative z-10 text-center pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2 tracking-wide">
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
              <Link href="/booking">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">
                  Book a Service
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
          onClick={scrollToServices}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/40">Scroll</span>
            <ChevronDown className="h-6 w-6 text-primary/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section id="services-grid" className="container mx-auto px-4 pt-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Curated Services</h2>
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
              <Link href={`/booking?service=${category.id}`}>
                <div className="group cursor-pointer">
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
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={whyChooseImg} 
                alt="Master Craftsman" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-3xl shadow-2xl hidden md:block">
              <p className="text-4xl font-serif font-bold text-white mb-1">15+</p>
              <p className="text-white/70 text-sm uppercase tracking-widest font-bold">Years of Mastery</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Why Choose Darzi?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that garment care is not just a chore, but an essential ritual for the modern professional. Our approach combines time-honored techniques with cutting-edge technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Artisan Attention to Detail",
                "Eco-Conscious Solvents",
                "Concierge Pickup & Delivery",
                "Signature Starch Finish",
                "Master Tailor Inspection",
                "Fabric Longevity Focus"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium text-primary/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process of Work */}
      <section className="bg-primary text-white py-24 rounded-[3.5rem] mx-4 lg:mx-8 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">The Methodology</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">The Darzi Journey</h2>
            </div>
            <p className="text-white/50 max-w-sm text-lg leading-relaxed border-l border-white/10 pl-8">
              A seamless, multi-stage experience designed for the discerning individual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-500 h-full"
              >
                <div className="absolute top-6 right-8 text-white/10 text-6xl font-serif font-bold group-hover:text-white/20 transition-colors">
                  0{i + 1}
                </div>
                
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-white group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line for desktop */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[1px] bg-white/10 z-0" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-secondary/20 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40 font-medium">Trusted by 2,000+ professionals</p>
            </div>
            <Link href="/booking">
              <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-primary transition-all px-8 py-6 text-lg group bg-transparent">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Client Echoes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Join the community of professionals who trust Darzi with their wardrobe.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-secondary/20 border border-primary/5 space-y-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="italic text-lg text-primary/80 leading-relaxed">"{t.content}"</p>
              <div>
                <p className="font-bold text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary/5 py-16 rounded-3xl mx-4 lg:mx-8">
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