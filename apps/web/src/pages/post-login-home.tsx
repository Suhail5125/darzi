import { Button } from "@darzi/shared-ui";
import { motion } from "framer-motion";
import { Search, MapPin, Plus, Star, Clock, Truck, Gift, Award, TrendingUp, Users, Package, Zap } from "lucide-react";
import { Link } from "wouter";

// Import generated assets
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
    description: "Gentle, eco-conscious laundry care",
    price: "From $8",
    image: washingImg,
    popular: false,
  },
  {
    id: "pressing",
    title: "Steam Pressing",
    description: "Crisp, wrinkle-free finish",
    price: "From $12",
    image: pressingImg,
    popular: true,
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Eco-friendly solvent cleaning",
    price: "From $25",
    image: dryCleaningImg,
    popular: true,
  },
  {
    id: "starch",
    title: "Premium Starch",
    description: "Signature stiffness for linens",
    price: "From $15",
    image: starchImg,
    popular: false,
  },
  {
    id: "alteration",
    title: "Expert Alterations",
    description: "Perfect fits and repairs",
    price: "From $20",
    image: alterationImg,
    popular: false,
  },
  {
    id: "tailoring",
    title: "Bespoke Tailoring",
    description: "Custom-made garments",
    price: "From $200",
    image: tailoringImg,
    popular: false,
  },
];

const products = [
  {
    id: 1,
    name: "Premium Fabric Softener",
    description: "Luxury fabric conditioner for ultimate softness",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Stain Removal Kit",
    description: "Professional-grade stain removal solution",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Garment Care Spray",
    description: "Refresh and protect your clothes between washes",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Delicate Wash Detergent",
    description: "Gentle formula for silk and wool garments",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    rating: 4.6,
  },
];

const offers = [
  {
    id: 1,
    title: "20% Off First Order",
    description: "New customer special - valid for 7 days",
    code: "WELCOME20",
    type: "discount",
  },
  {
    id: 2,
    title: "Free Pickup & Delivery",
    description: "On orders above $50",
    code: "FREEDEL50",
    type: "shipping",
  },
  {
    id: 3,
    title: "Loyalty Points 2x",
    description: "Double points on dry cleaning this week",
    code: "DOUBLE2X",
    type: "points",
  },
];

export default function PostLoginHome() {
  return (
    <div className="flex flex-col gap-6 pt-24 pb-8">
      {/* Hero Section with Offers */}
      <section className="px-4">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5" />
              <span className="text-sm font-medium">Special Offers</span>
            </div>
            <h2 className="text-2xl font-serif font-bold mb-4">Welcome back, Alex!</h2>
            
            <div className="grid grid-cols-1 gap-3">
              {offers.slice(0, 2).map((offer) => (
                <div key={offer.id} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{offer.title}</h3>
                      <p className="text-xs text-white/80">{offer.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono bg-white/20 px-2 py-1 rounded">{offer.code}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="secondary" className="mt-4 w-full rounded-xl">
              View All Offers
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-bold text-primary">Our Services</h2>
          <Link href="/services">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {services.slice(0, 10).map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.02 }}
              className="relative bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-sm"
            >
              {service.popular && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="aspect-[4/3] relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-sm text-primary mb-1">{service.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{service.price}</span>
                  <Button size="sm" className="h-7 px-3 text-xs rounded-lg">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-bold text-primary">Our Products</h2>
          <Link href="/products">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="aspect-square relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-sm text-primary mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{product.price}</span>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-xs rounded-lg">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4">
        <h2 className="text-2xl font-serif font-bold text-primary mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-16 rounded-2xl flex-col gap-1">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Track Order</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-2xl flex-col gap-1">
            <Truck className="h-5 w-5" />
            <span className="text-sm">Schedule Pickup</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-2xl flex-col gap-1">
            <Award className="h-5 w-5" />
            <span className="text-sm">Rewards</span>
          </Button>
          <Button variant="outline" className="h-16 rounded-2xl flex-col gap-1">
            <Zap className="h-5 w-5" />
            <span className="text-sm">Express Service</span>
          </Button>
        </div>
      </section>

      {/* Stats Bar - Moved to Bottom */}
      <section className="px-4">
        <div className="bg-primary/5 rounded-2xl p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center mb-1">
                <Package className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold text-primary">12</span>
              </div>
              <p className="text-xs text-muted-foreground">Active Orders</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Award className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold text-primary">850</span>
              </div>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold text-primary">$240</span>
              </div>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold text-primary">Gold</span>
              </div>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}