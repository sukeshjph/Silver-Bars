export type OrderType = "SELL" | "BUY";

export type sortOrderType = "asc" | "desc";

export interface Order {
  userId: string;
  quantity: number;
  price: number;
  orderType: OrderType;
}

export interface OrderSummary {}

// Generic types
export interface StringTMap<T> { [key: string]: T; };