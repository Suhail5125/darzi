import { motion } from "framer-motion";
import { Scissors, Award, Clock, Users } from "lucide-react";

export default function OurCraft() {
  const craftSteps = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Honored Techniques",
      description: "Traditional methods passed down through generations of master craftsmen"
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Precision Craftsmanship",
      description: "Every stitch, every press, every detail executed with meticulous attention"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium Materials",
      description: "Only the finest threads, buttons, and fabrics for lasting quality"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Master Artisans",
      description: "Skilled craftspeople with decades of experience in garment care"
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Our <span className="italic font-light">Craft</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The art of garment care elevated to its highest form through dedication, skill, and unwavering attention to detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {craftSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl font-serif font-bold mb-4">The Darzi Difference</h2>
            <p className="text-white/80 leading-relaxed">
              Every garment that passes through our hands receives the same level of care and attention as if it were our own most treasured piece.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}