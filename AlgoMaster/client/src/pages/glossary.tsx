import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GlossaryTerm, FAQItem } from "@shared/schema";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: glossaryTerms, isLoading: isLoadingGlossary, error: glossaryError } = useQuery<GlossaryTerm[]>({
    queryKey: ["/api/glossary"],
  });

  const { data: faqItems, isLoading: isLoadingFAQ, error: faqError } = useQuery<FAQItem[]>({
    queryKey: ["/api/faq"],
  });

  const isLoading = isLoadingGlossary || isLoadingFAQ;
  const hasError = glossaryError || faqError;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl" />
        </div>
        <Skeleton className="h-10 w-full mb-8" />
        <Skeleton className="h-12 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (hasError || !glossaryTerms || !faqItems) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load</h1>
        <p className="text-muted-foreground mb-8">
          Unable to load glossary content. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const filteredTerms = searchQuery
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : glossaryTerms;

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  const categories = [...new Set(glossaryTerms.map((t) => t.category))];
  const faqCategories = [...new Set(faqItems.map((f) => f.category))];

  const groupedTerms = categories.reduce((acc, category) => {
    acc[category] = filteredTerms.filter((t) => t.category === category);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const groupedFAQs = faqCategories.reduce((acc, category) => {
    acc[category] = filteredFAQs.filter((f) => f.category === category);
    return acc;
  }, {} as Record<string, typeof faqItems>);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Glossary & FAQ</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Quick reference for DSA terminology and answers to frequently asked questions.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search terms and questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-glossary-search"
        />
      </div>

      <Tabs defaultValue="glossary" className="space-y-8">
        <TabsList data-testid="tabs-glossary-faq">
          <TabsTrigger value="glossary" data-testid="tab-glossary">
            Glossary ({filteredTerms.length})
          </TabsTrigger>
          <TabsTrigger value="faq" data-testid="tab-faq">
            FAQ ({filteredFAQs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="glossary" className="space-y-8">
          {categories.map((category) => {
            const terms = groupedTerms[category];
            if (terms.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {terms.length} terms
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <Card key={term.id} data-testid={`card-term-${term.term.toLowerCase().replace(/ /g, "-")}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{term.term}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-3">
                          {term.definition}
                        </p>
                        {term.relatedTerms.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-muted-foreground mr-1">Related:</span>
                            {term.relatedTerms.map((related) => (
                              <Badge
                                key={related}
                                variant="outline"
                                className="text-xs"
                              >
                                {related}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No terms found matching "{searchQuery}"
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="faq" id="faq" className="space-y-8">
          {faqCategories.map((category) => {
            const faqs = groupedFAQs[category];
            if (faqs.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {faqs.length} questions
                  </Badge>
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border rounded-lg px-4"
                      data-testid={`accordion-faq-${faq.id}`}
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <span className="text-left font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No questions found matching "{searchQuery}"
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
