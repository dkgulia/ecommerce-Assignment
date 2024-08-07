export interface Order {
    id?: string;
    user_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
    order_date?: Date;
}
