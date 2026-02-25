import { motion } from "framer-motion";
import { Handshake, TrendingUp, Shield, Mail } from "lucide-react";

export default function BecomeSeller() {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Grow Your Business",
      description: "Access our premium customer base and expand your reach in the luxury market"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Benefit from our reputation for excellence and quality standards"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Partnership Support",
      description: "Comprehensive training, marketing support, and ongoing business development"
    }
  ];

  const requirements = [
    "Minimum 5 years experience in garment care or tailoring",
    "Commitment to Darzi's quality and service standards",
    "Professional facility and equipment",
    "Insurance and proper licensing",
    "Dedication to customer excellence",
    "Alignment with our sustainability values"
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
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-6">
              <Handshake className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Partnership</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Become a <br className="hidden sm:block" />
              <span className="italic font-light">Darzi Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join our network of premium service providers and bring the Darzi standard of excellence to your community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-primary/5 rounded-3xl p-8 md:p-10 mb-12"
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">Partnership Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <Mail className="h-8 w-8 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4">Ready to Partner With Us?</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Take the first step towards joining the Darzi family. Send us your business information and let's discuss how we can grow together.
            </p>
            <a 
              href="mailto:partnerships@darzi.com" 
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              partnerships@darzi.com
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}