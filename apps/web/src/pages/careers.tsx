import { motion } from "framer-motion";
import { Briefcase, Users, Star, Mail } from "lucide-react";

export default function Careers() {
  const positions = [
    {
      title: "Master Tailor",
      department: "Craftsmanship",
      type: "Full-time",
      description: "Lead our bespoke tailoring services with expertise in pattern making and garment construction"
    },
    {
      title: "Dry Cleaning Specialist",
      department: "Operations",
      type: "Full-time", 
      description: "Operate advanced cleaning equipment and ensure quality standards for premium garment care"
    },
    {
      title: "Customer Experience Manager",
      department: "Service",
      type: "Full-time",
      description: "Deliver exceptional service experiences and manage client relationships"
    },
    {
      title: "Delivery Coordinator",
      department: "Logistics",
      type: "Part-time",
      description: "Coordinate pickup and delivery services with attention to detail and customer satisfaction"
    }
  ];

  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health and dental coverage",
    "Professional development and training programs",
    "Employee garment care services",
    "Flexible scheduling options",
    "Career advancement opportunities"
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
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Careers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Join Our Team of <br className="hidden sm:block" />
              <span className="italic font-light">Master Craftspeople</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build a rewarding career with a company that values excellence, craftsmanship, and personal growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-primary/5 rounded-3xl p-8 md:p-10 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-serif font-bold text-primary">Why Work With Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary text-center mb-8">Open Positions</h2>
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary">{position.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Apply Now
                  </button>
                </div>
                <p className="text-muted-foreground leading-relaxed">{position.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <Mail className="h-8 w-8 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              We're always looking for talented individuals who share our passion for excellence. Send us your resume and tell us how you'd like to contribute.
            </p>
            <a 
              href="mailto:careers@darzi.com" 
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              careers@darzi.com
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}