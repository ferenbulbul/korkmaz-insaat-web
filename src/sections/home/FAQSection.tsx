'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { SectionTitle } from '@/components/shared'
import { cn } from '@/lib/utils'
import { FAQ_ITEMS } from '@/constants/faq'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionWrapper bgColor="white">
      <Container>
        <SectionTitle
          overline="SIKÇA SORULAN SORULAR"
          title="Merak Edilenler"
          description="Gönen'de ev almak isteyenlerin en çok sorduğu soruları yanıtladık."
          alignment="center"
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={cn(
                  'overflow-hidden rounded-xl border transition-all duration-300',
                  isOpen
                    ? 'border-accent/20 bg-white shadow-sm'
                    : 'border-border bg-white/60'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                      isOpen && 'rotate-180 text-accent'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default FAQSection
