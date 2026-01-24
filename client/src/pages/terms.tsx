import Layout from "@/components/layout";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">Terms of Service</h1>
          <div className="prose prose-slate lg:prose-lg">
            <p className="text-muted-foreground leading-relaxed mb-6">By engaging with Darzi, you agree to the following terms governing our premium garment care services.</p>
            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">1. Service Quality</h2>
            <p className="text-muted-foreground mb-6">Darzi provides professional garment care. While we exercise extreme caution, we are not responsible for inherent defects in fabrics or accessories.</p>
            <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4">2. Pickup & Delivery</h2>
            <p className="text-muted-foreground">Concierge services are subject to availability and scheduling within designated fashion districts.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}