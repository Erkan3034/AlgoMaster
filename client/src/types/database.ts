// Supabase Database Types
// Auto-generated types for type safety

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      data_structures: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          complexity: Json;
          definition: string;
          use_cases: string[];
          pros: string[];
          cons: string[];
          visual_explanation: string;
          code_example: string;
          experiment_scenario: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          complexity: Json;
          definition: string;
          use_cases: string[];
          pros: string[];
          cons: string[];
          visual_explanation: string;
          code_example: string;
          experiment_scenario: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
          complexity?: Json;
          definition?: string;
          use_cases?: string[];
          pros?: string[];
          cons?: string[];
          visual_explanation?: string;
          code_example?: string;
          experiment_scenario?: string;
          updated_at?: string;
        };
      };
      algorithms: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          category: "sorting" | "searching" | "graph";
          time_complexity: Json;
          space_complexity: string;
          definition: string;
          steps: string[];
          visual_diagram: string;
          input_output_examples: Json;
          code_implementation: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          category: "sorting" | "searching" | "graph";
          time_complexity: Json;
          space_complexity: string;
          definition: string;
          steps: string[];
          visual_diagram: string;
          input_output_examples: Json;
          code_implementation: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
          category?: "sorting" | "searching" | "graph";
          time_complexity?: Json;
          space_complexity?: string;
          definition?: string;
          steps?: string[];
          visual_diagram?: string;
          input_output_examples?: Json;
          code_implementation?: string;
          updated_at?: string;
        };
      };
      glossary_terms: {
        Row: {
          id: string;
          term: string;
          definition: string;
          related_terms: string[];
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          term: string;
          definition: string;
          related_terms: string[];
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          term?: string;
          definition?: string;
          related_terms?: string[];
          category?: string;
          updated_at?: string;
        };
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper types for frontend
export type DataStructureRow = Database["public"]["Tables"]["data_structures"]["Row"];
export type AlgorithmRow = Database["public"]["Tables"]["algorithms"]["Row"];
export type GlossaryTermRow = Database["public"]["Tables"]["glossary_terms"]["Row"];
export type FAQItemRow = Database["public"]["Tables"]["faq_items"]["Row"];

