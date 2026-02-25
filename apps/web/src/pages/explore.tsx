import { Button, Card, CardContent } from "@darzi/shared-ui";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";
import { Link } from "wouter";
import React from "react";

// Import service images
import pressingImg from "@assets/generated_images/professional_clothes_pressing_service.png";
import dryCleaningImg from "@assets/generated_images/dry_cleaning_service_visual.png";
import starchImg from "@assets/generated_images/starch_service_crisp_linens.png";
import alterationImg from "@assets/generated_images/clothing_alteration_service.png";
import tailoringImg from "@assets/generated_images/bespoke_tailoring_service.png";
import washingImg from "@assets/generated_images/professional_laundry_washing_service.png";

const services = [
  {
    id: "washing",
    title: "Eco Washing",
    category: "Cleaning",
    description: "Gentle, eco-conscious laundry care for everyday essentials.",
    image: washingImg,
    features: ["Biodegradable Solvents", "Odor Removal", "Color Protection"],
    price: "From $15"
  },
  {
    id: "pressing",
    title: "Steam Pressing",
    category: "Finishing",
    description: "Crisp, wrinkle-free finish for your daily wear.",
    image: pressingImg,
    features: ["Industrial Steam", "Hand Finishing", "Hanger or Folded"],
    price: "From $8"
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    category: "Cleaning",
    description: "Professional solvent cleaning for delicate fabrics.",
    image: dryCleaningImg,
    features: ["Silk & Wool Care", "Stain Pre-treatment", "Breathable Packaging"],
    price: "From $25"
  },
  {
    id: "starch",
    title: "Premium Starch",
    category: "Finishing",
    description: "Classic signature finish for dress shirts and linens.",
    image: starchImg,
    features: ["Custom Stiffness", "Edge Crispness", "Uniform Finish"],
    price: "From $12"
  },
  {
    id: "alteration",
    title: "Expert Alterations",
    category: "Tailoring",
    description: "Precision adjustments to your existing wardrobe.",
    image: alterationImg,
    features: ["Hemming", "Waist Adjustments", "Zip Replacements"],
    price: "Quote Required"
  },
  {
    id: "tailoring",
    title: "Bespoke Tailoring",
    category: "Tailoring",
    description: "Fully custom garment creation from measurement to fitting.",
    image: tailoringImg,
    features: ["Master Tailor", "Fabric Selection", "Multiple Fittings"],
    price: "Quote Required"
  }
];

const categories = ["All", "Cleaning", "Finishing", "Tailoring"];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [filteredServices, setFilteredServices] = React.useState(services);

  React.useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-6 md:px-12 pb-16 page-padding-top">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Explore Our Services</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover our complete range of premium garment care and tailoring services.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-primary">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-primary/10 hover:border-primary/20 transition-all group overflow-hidden">
            <CardContent className="p-0">
              {/* Service Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Service Info */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs text-primary/60 font-bold tracking-[0.2em] uppercase mb-2 block">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-primary/80">
                      <CheckCircle2 className="h-3 w-3 text-primary/40" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price & Book Button */}
                <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                  <span className="font-serif text-lg font-bold text-primary">{service.price}</span>
                  <Link href={`/booking?service=${service.id}`}>
                    <Button size="sm" className="rounded-full group">
                      Book Now
                      <ArrowRight className="ml-1 h-3 w-3 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-primary mb-2">No services found</h3>
          <p className="text-muted-foreground">Try selecting a different category</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-primary/5 rounded-3xl p-12">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">
          Ready to Experience Premium Care?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Book any of our services and let our experts take care of your wardrobe with precision and care.
        </p>
        <Link href="/booking">
          <Button className="rounded-full px-8">
            Start Booking
          </Button>
        </Link>
      </div>
    </div>
  );
}