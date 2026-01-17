import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Import generated assets
import pressingImg from "@assets/generated_images/professional_clothes_pressing_service.png";
import dryCleaningImg from "@assets/generated_images/dry_cleaning_service_visual.png";
import starchImg from "@assets/generated_images/starch_service_crisp_linens.png";
import alterationImg from "@assets/generated_images/clothing_alteration_service.png";
import tailoringImg from "@assets/generated_images/bespoke_tailoring_service.png";
import washingImg from "@assets/generated_images/professional_laundry_washing_service.png";

const allServices = [
  {
    id: "washing",
    title: "Eco Washing",
    description: "Gentle, eco-conscious laundry care for everyday essentials. We use biodegradable detergents that are tough on stains but soft on the planet.",
    image: washingImg,
    features: ["Biodegradable Solvents", "Odor Removal", "Color Protection"],
    price: "From $15"
  },
  {
    id: "pressing",
    title: "Steam Pressing",
    description: "Crisp, wrinkle-free finish for your daily wear. Our industrial-grade steam technology penetrates fibers for a sharp, lasting finish.",
    image: pressingImg,
    features: ["Industrial Steam", "Hand Finishing", "Hanger or Folded"],
    price: "From $8"
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Professional solvent cleaning for delicate and luxury fabrics that shouldn't be touched by water.",
    image: dryCleaningImg,
    features: ["Silk & Wool Care", "Stain Pre-treatment", "Breathable Packaging"],
    price: "From $25"
  },
  {
    id: "starch",
    title: "Premium Starch",
    description: "The classic signature finish for dress shirts and linens. Choose your preferred stiffness level.",
    image: starchImg,
    features: ["Custom Stiffness", "Edge Crispness", "Uniform Finish"],
    price: "From $12"
  },
  {
    id: "alteration",
    title: "Expert Alterations",
    description: "Precision adjustments to your existing wardrobe. From simple hems to complex resize projects.",
    image: alterationImg,
    features: ["Hemming", "Waist Adjustments", "Zip Replacements"],
    price: "Quote Required"
  },
  {
    id: "tailoring",
    title: "Bespoke Tailoring",
    description: "The pinnacle of garment creation. A fully custom experience from measurement to final fitting.",
    image: tailoringImg,
    features: ["Master Tailor", "Fabric Selection", "Multiple Fittings"],
    price: "Quote Required"
  }
];

export default function Services() {
  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Hero */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">Our Craftsmanship</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
              Explore our range of premium garment care services. Each category is handled by specialists dedicated to perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 md:px-12 space-y-32">
        {allServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-24 items-center`}
          >
            <div className="flex-1 w-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div>
                <span className="text-primary/60 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                  Service {index + 1}
                </span>
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">{service.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-primary/80">
                    <CheckCircle2 className="h-5 w-5 text-primary/40" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-primary/5">
                <span className="font-serif text-xl font-bold text-primary">{service.price}</span>
                <Link href={`/booking?service=${service.id}`}>
                  <Button className="rounded-full px-8 group">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}