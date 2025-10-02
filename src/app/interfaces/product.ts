export interface Category {
  id: number;
  name: string;
  image: string;
   hasValidImage?: boolean;
   loading?: boolean; 
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string; 
  updatedAt: string;  
}
