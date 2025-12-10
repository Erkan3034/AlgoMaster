import { QueryClient } from "@tanstack/react-query";
import { dataStructures, algorithms, glossaryTerms, faqItems } from "@shared/schema";

// Static data - no backend needed
export const staticData = {
  dataStructures,
  algorithms,
  glossaryTerms,
  faqItems,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  },
});
