export type Faq = {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  isPublished: boolean;
  displayOrder: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

