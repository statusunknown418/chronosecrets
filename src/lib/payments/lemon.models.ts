export type OrderWebhookPayload = {
  data: Data;
  meta: Meta;
};

export type Data = {
  id: string;
  type: string;
  links: DataLinks;
  attributes: Attributes;
  relationships: Relationships;
};

export type Attributes = {
  tax: number;
  urls: Urls;
  total: number;
  status: string;
  tax_usd: number;
  currency: string;
  refunded: boolean;
  store_id: number;
  subtotal: number;
  tax_name: null;
  tax_rate: string;
  test_mode: boolean;
  total_usd: number;
  user_name: string;
  created_at: Date;
  identifier: string;
  updated_at: Date;
  user_email: string;
  customer_id: number;
  refunded_at: null;
  order_number: number;
  subtotal_usd: number;
  currency_rate: string;
  tax_formatted: string;
  discount_total: number;
  total_formatted: string;
  first_order_item: FirstOrderItem;
  status_formatted: string;
  discount_total_usd: number;
  subtotal_formatted: string;
  discount_total_formatted: string;
};

export type FirstOrderItem = {
  id: number;
  price: number;
  order_id: number;
  price_id: number;
  test_mode: boolean;
  created_at: Date;
  product_id: number;
  updated_at: Date;
  variant_id: number;
  product_name: string;
  variant_name: string;
};

export type Urls = {
  receipt: string;
};

export type DataLinks = {
  self: string;
};

export type Relationships = {
  store: Customer;
  customer: Customer;
  "order-items": Customer;
  "license-keys": Customer;
  subscriptions: Customer;
  "discount-redemptions": Customer;
};

export type Customer = {
  links: CustomerLinks;
};

export type CustomerLinks = {
  self: string;
  related: string;
};

export type Meta = {
  test_mode: boolean;
  event_name: string;
  webhook_id: string;
  custom_data: CustomData;
};

export type CustomData = {
  tokens: string;
  user_id: string;
  previous_tokens: string;
};
