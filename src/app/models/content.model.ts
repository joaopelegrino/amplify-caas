export interface ContentAnalysis {
  professionalInfo?: {
    name: string | null;
    specialty: string | null;
    registration?: string | null;
  };
  technicalDetails?: {
    medications: string[];
    treatments: string[];
    claims: string[];
  };
  references?: {
    doi: string;
    title: string;
    authors: string;
    journal: string;
    year: number;
    url?: string;
  }[];
}

export interface GeneratedArticle {
  title: string;
  content: string;
  references: string[];
  author: {
    name: string;
    registration: string;
    specialty: string;
    address: string;
    phone: string;
    email: string;
  };
} 