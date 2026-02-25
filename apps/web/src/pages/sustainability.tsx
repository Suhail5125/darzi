import { motion } from "framer-motion";
import { Leaf, Droplets, Recycle, Heart } from "lucide-react";

export default function Sustainability() {
  const initiatives = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Eco-Conscious Solvents",
      description: "We use only biodegradable, non-toxic cleaning solutions that are safe for you and the environment"
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Water Conservation",
      description: "Advanced filtration and recycling systems reduce water usage by 60% compared to traditional methods"
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Waste Reduction",
      description: "Zero-waste packaging and garment recycling programs to minimize our environmental footprint"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Care",
      description: "Supporting local communities through garment donation programs and sustainable employment"
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full mb-6">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Sustainability</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Caring for Your Clothes, <br className="hidden sm:block" />
              <span className="italic font-light">Caring for Our Planet</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our commitment to excellence extends beyond garment care to environmental stewardship and community responsibility.
            </p>
          </motion.div>

          <div className="space-y-8 mb-16">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-green-600 text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl font-serif font-bold mb-4">Our Promise</h2>
            <p className="text-white/90 leading-relaxed">
              Every choice we make is guided by our responsibility to future generations. Premium care shouldn't come at the planet's expense.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}