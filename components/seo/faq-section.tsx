import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { generateFAQStructuredData } from "@/lib/seo/structured-data"
import { StructuredDataScriptServer } from "./structured-data-script"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

/**
 * FAQセクション（SEO構造化データ付き）
 */
export function FAQSection({ faqs, title = "よくある質問" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const structuredData = generateFAQStructuredData(faqs)

  return (
    <>
      <StructuredDataScriptServer data={structuredData} id="faq-structured-data" />
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
