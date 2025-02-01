import { faqs } from './data';
import {motion} from 'framer-motion';

const FAQs = ({ question, answer }: { question: string; answer: string }) => {
  
    return (
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2"/>
        <div className="collapse-title text-lg font-medium">{question}</div>
        <div className="collapse-content">
          <p>{answer}</p>
        </div>
      </div>
    );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-10">
        <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-navy">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    className="collapse collapse-arrow bg-base-200"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <input type="radio" name="my-accordion-2"/>
                    <div className="collapse-title text-lg font-medium">{faq.question}</div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}
