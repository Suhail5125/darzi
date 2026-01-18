import { motion } from "framer-motion";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";
import tailoringImg from "@assets/generated_images/bespoke_tailoring_service.png";

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24 page-padding-top">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary text-white rounded-3xl mx-6 md:mx-12">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">The Darzi Legacy</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
              Craftsmanship isn't just a process; it's our heritage. Since 2026, we've redefined what it means to care for your wardrobe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight">Where Every Stitch <br/> Tells a Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Founded on the principles of precision and passion, Darzi emerged as a response to the fast-fashion era. We believe that clothes aren't just fabric; they are an extension of your identity.
              </p>
              <p>
                Our master tailors and fabric specialists bring decades of expertise to every garment. From the most delicate silks to structured bespoke suits, we apply rigorous standards of care that ensure your pieces last for generations.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img src={tailoringImg} alt="Craftsmanship" className="object-cover w-full h-full" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-background p-8 rounded-2xl shadow-xl border border-primary/5 hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-primary/10">
                   <img src={logoImage} alt="Darzi" className="object-cover h-full w-full" />
                </div>
                <div>
                  <p className="font-serif font-bold text-primary">Master Tailor Verified</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Premium Quality Standard</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/20 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">15k+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Garments Perfected</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">48hr</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Standard Turnaround</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Eco-Friendly Solvents</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">12</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Master Artisans</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}