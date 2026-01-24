import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      q: "What is your standard turnaround time?",
      a: "Our standard service is completed within 48 hours. For bespoke tailoring, times vary based on complexity."
    },
    {
      q: "Do you offer organic cleaning options?",
      a: "Yes, we exclusively use eco-friendly solvents and organic cleaning processes to protect both your garments and the environment."
    },
    {
      q: "How does the pickup service work?",
      a: "Once you book, a concierge will be assigned to collect your items from your specified location within our service zones."
    },
    {
      q: "Can you handle vintage or delicate couture?",
      a: "Our master artisans specialize in high-end, vintage, and couture pieces with specialized hand-finishing techniques."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12 text-center">Frequently Asked</h1>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-white shadow-sm overflow-hidden">
                <AccordionTrigger className="text-lg font-serif font-bold text-primary py-6 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Layout>
  );
}