export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  available: boolean;
  instructor: string;
  duration: string;
  level: string;
  tags: string[];
  enrollmentCount?: number;
  rating?: number;
}
