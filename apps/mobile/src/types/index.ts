export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tip: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ServiceCategory = 'Cleaning' | 'Finishing' | 'Tailoring' | 'Pressing' | 'Dry Cleaning' | 'Laundry' | 'Starch' | 'Washing' | 'Alteration';

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  features: string[];
  price: number;
  image: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  price: number;
}

export type OrderStatus = 'In Progress' | 'Delivered' | 'Picked Up';

export interface Order {
  id: string;
  serviceType: string;
  status: OrderStatus;
  date: string;
  total: number;
}
