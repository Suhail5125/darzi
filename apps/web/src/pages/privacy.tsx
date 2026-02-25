import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account, booking services, or contacting us",
        "Service preferences and garment care instructions",
        "Payment information processed securely through our payment partners",
        "Communication records for customer service and quality assurance",
        "Usage data to improve our services and user experience"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our premium garment care services",
        "Process bookings, payments, and service requests",
        "Communicate with you about your orders and account",
        "Send service updates, care tips, and promotional offers (with consent)",
        "Improve our services based on your feedback and usage patterns",
        "Ensure security and prevent fraud"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Information Sharing & Disclosure",
      content: [
        "We never sell your personal information to third parties",
        "Service providers who help us operate our business (payment processors, delivery partners)",
        "Legal compliance when required by law or to protect our rights",
        "Business transfers in the event of a merger or acquisition",
        "With your explicit consent for specific purposes"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Security & Protection",
      content: [
        "Industry-standard encryption for all data transmission",
        "Secure servers with regular security audits and updates",
        "Limited access to personal information on a need-to-know basis",
        "Regular staff training on data protection and privacy practices",
        "Incident response procedures for any potential data breaches"
      ]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Your Rights & Choices",
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Data portability - receive a copy of your data",
        "Object to certain processing activities"
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
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Your Privacy, <br className="hidden sm:block" />
              <span className="italic font-light">Our Promise</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your personal information with the same care and attention we give to your finest garments.
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
              <h3 className="text-2xl font-serif font-bold">Questions About Your Privacy?</h3>
            </div>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              We're here to help. If you have any questions about this Privacy Policy or how we handle your personal information, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:privacy@darzi.com" 
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                privacy@darzi.com
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