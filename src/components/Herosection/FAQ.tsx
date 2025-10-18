'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What is Sacco Yetu?',
            answer: 'Sacco Yetu is a financial SACCO designed for the Kenyan market, helping members build wealth through savings, investments, and access to affordable credit.',
          },
          {
            id: 'item-2',
            question: 'What payment methods do you accept?',
            answer: 'We support payments via M-Pesa, bank transfer, and debit or credit cards. Members can easily deposit or withdraw funds through our digital platform.',
          },
          {
            id: 'item-3',
            question: 'Can I change or cancel my contribution plan?',
            answer: 'Yes, you can modify or pause your contribution plan anytime through your Sacco Yetu account dashboard or by contacting our member support team.',
          },
          {
            id: 'item-4',
            question: 'Do you serve members outside Kenya?',
            answer: 'Currently, Sacco Yetu serves members within Kenya. However, we are working towards expanding to support Kenyans in the diaspora.',
          },
          {
            id: 'item-5',
            question: 'What is your withdrawal policy?',
            answer: 'Members can withdraw part or all of their savings depending on their account type. Loan repayments and withdrawal timelines are clearly outlined in our membership terms.',
          },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            to="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}