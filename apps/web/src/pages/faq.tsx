import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@darzi/shared-ui";
import { HelpCircle, Clock, Leaf, Truck, Star, Mail } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Service & Timing",
      icon: <Clock className="h-5 w-5" />,
      faqs: [
        {
          q: "What is your standard turnaround time?",
          a: "Our standard service is completed within 48-72 hours. Rush services are available for same-day or next-day delivery with additional fees."
        },
        {
          q: "Do you offer weekend and holiday services?",
          a: "Yes, we provide pickup and delivery services 7 days a week. Holiday schedules may vary, and we'll notify you of any changes in advance."
        },
        {
          q: "What are your operating hours?",
          a: "Our boutique is open Monday-Saturday 8AM-7PM, Sunday 10AM-5PM. Pickup and delivery services operate from 7AM-9PM daily."
        }
      ]
    },
    {
      title: "Pickup & Delivery",
      icon: <Truck className="h-5 w-5" />,
      faqs: [
        {
          q: "How does the pickup service work?",
          a: "Once you book, a concierge will be assigned to collect your items from your specified location within our service zones. You'll receive confirmation and tracking updates."
        },
        {
          q: "What areas do you serve?",
          a: "We currently serve Manhattan, Brooklyn, and select areas of Queens. Check our service map or contact us to confirm availability in your area."
        },
        {
          q: "Is there a minimum order for pickup?",
          a: "No minimum order required. However, orders over $50 receive complimentary pickup and delivery."
        }
      ]
    },
    {
      title: "Garment Care",
      icon: <Star className="h-5 w-5" />,
      faqs: [
        {
          q: "Can you handle vintage or delicate couture?",
          a: "Our master artisans specialize in high-end, vintage, and couture pieces with specialized hand-finishing techniques and museum-quality care."
        },
        {
          q: "Do you offer organic cleaning options?",
          a: "Yes, we exclusively use eco-friendly solvents and organic cleaning processes to protect both your garments and the environment."
        },
        {
          q: "What if my garment gets damaged?",
          a: "We carry comprehensive insurance and will repair or replace any item damaged in our care, up to the garment's replacement value."
        }
      ]
    },
    {
      title: "Sustainability",
      icon: <Leaf className="h-5 w-5" />,
      faqs: [
        {
          q: "How environmentally friendly are your processes?",
          a: "We use biodegradable solvents, energy-efficient equipment, and have reduced water usage by 60%. All packaging is recyclable or compostable."
        },
        {
          q: "Do you have a garment recycling program?",
          a: "Yes, we partner with local charities to donate unclaimed items and offer a textile recycling service for worn-out garments."
        }
      ]
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
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-6">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Frequently Asked <br className="hidden sm:block" />
              <span className="italic font-light">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our services, processes, and policies.
            </p>
          </motion.div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-background border border-primary/5 rounded-3xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">
                    {category.title}
                  </h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`${categoryIndex}-${i}`} 
                      className="border border-primary/5 rounded-2xl px-6 bg-white/50 shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="text-lg font-serif font-semibold text-primary py-6 hover:no-underline text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 bg-primary text-white rounded-3xl p-8 md:p-10 text-center"
          >
            <Mail className="h-8 w-8 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4">Still Have Questions?</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Our customer care team is here to help with any questions not covered above. We're committed to providing you with all the information you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:care@darzi.com" 
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                care@darzi.com
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