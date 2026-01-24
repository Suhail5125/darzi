import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground mb-12">Our concierge team is available to assist with your inquiries and special requests.</p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-1 text-primary">Email</h3>
                  <p className="text-muted-foreground">care@darzi.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-1 text-primary">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 234-5678</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-1 text-primary">Boutique</h3>
                  <p className="text-muted-foreground">123 Luxury Lane, Fashion District, NY</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/40 uppercase tracking-widest ml-1">Full Name</label>
                <input className="w-full h-14 px-6 rounded-2xl bg-primary/[0.02] border border-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="Alexander Thorne" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/40 uppercase tracking-widest ml-1">Email</label>
                <input className="w-full h-14 px-6 rounded-2xl bg-primary/[0.02] border border-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all" placeholder="alex@darzi.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary/40 uppercase tracking-widest ml-1">Message</label>
                <textarea className="w-full min-h-[150px] p-6 rounded-2xl bg-primary/[0.02] border border-primary/5 focus:bg-white focus:border-primary/20 outline-none transition-all resize-none" placeholder="How can we assist you?" />
              </div>
              <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">Send Inquiry</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}