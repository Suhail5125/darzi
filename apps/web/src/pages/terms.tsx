import { motion } from "framer-motion";
import { Scale, FileText, Shield, Clock, AlertTriangle, Mail } from "lucide-react";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Darzi's services, you accept and agree to be bound by these terms",
        "These terms apply to all users of our website, mobile app, and services",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time with notice"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Service Description",
      content: [
        "Premium dry cleaning using eco-conscious solvents and techniques",
        "Professional pressing and steaming services",
        "Expert alterations and bespoke tailoring",
        "Signature starch finishing for linens and dress shirts",
        "Concierge pickup and delivery within our service areas",
        "Garment inspection and care consultation"
      ]
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "User Responsibilities",
      content: [
        "Provide accurate information about garments and special care requirements",
        "Disclose any stains, damage, or defects before service",
        "Ensure garments are suitable for the requested service type",
        "Make payment according to agreed terms and pricing",
        "Be available for pickup and delivery appointments",
        "Report any issues within 48 hours of service completion"
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Limitation of Liability",
      content: [
        "Our liability is limited to the replacement value of the garment or service cost, whichever is less",
        "We maintain comprehensive insurance for your protection",
        "Not liable for damage to items with undisclosed stains or pre-existing defects",
        "Vintage, antique, or irreplaceable items processed at owner's risk",
        "Color bleeding or fabric shrinkage beyond industry standards may occur",
        "We recommend professional cleaning for high-value items"
      ]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Service Terms & Pricing",
      content: [
        "Standard turnaround time is 2-3 business days unless otherwise specified",
        "Rush services available for additional fees",
        "Pricing based on garment type, fabric, and service complexity",
        "Payment due upon service completion unless credit terms arranged",
        "Unclaimed items after 30 days may be donated to charity",
        "Storage fees may apply for extended holding periods"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-6">
              <Scale className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Service Terms & <br className="hidden sm:block" />
              <span className="italic font-light">Conditions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Clear, fair terms that protect both you and our commitment to exceptional garment care. Please read carefully before using our services.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-4 font-medium">
              Last updated: January 2026
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <div className="h-2 w-2 bg-primary/40 rounded-full mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">
                  Important Notice
                </h3>
                <p className="text-amber-800 leading-relaxed mb-4">
                  While we take every precaution to ensure the safety of your garments, dry cleaning and alterations involve inherent risks. We strongly recommend discussing any concerns about valuable or delicate items with our master craftsmen before service.
                </p>
                <p className="text-amber-700 text-sm font-medium">
                  For items valued over $500, we recommend our premium care service with additional insurance coverage.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="h-6 w-6" />
              <h3 className="text-2xl font-serif font-bold">Questions About Our Terms?</h3>
            </div>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Our team is here to clarify any questions about our service terms, pricing, or policies. We believe in transparent communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:legal@darzi.com" 
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                legal@darzi.com
              </a>
              <span className="text-white/60 text-sm">or</span>
              <a 
                href="tel:+15552345678" 
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                +1 (555) 234-5678
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}