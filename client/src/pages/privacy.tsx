import Layout from "@/components/layout";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>
          <div className="prose prose-slate lg:prose-lg">
            <p className="text-muted-foreground leading-relaxed mb-6">Your privacy is of paramount importance to Darzi. This policy outlines how we handle your personal information with the same care we apply to your garments.</p>
            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">1. Information Collection</h2>
            <p className="text-muted-foreground mb-6">We collect information necessary to provide premium garment care, including contact details, measurements, and service preferences.</p>
            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">2. Data Usage</h2>
            <p className="text-muted-foreground">Your data is used exclusively to enhance your service experience and is never shared with third parties for marketing purposes.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}