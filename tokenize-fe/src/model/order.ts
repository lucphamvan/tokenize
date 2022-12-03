export interface Order {
    id: string;
    userId: string;
    price: number;
    size: number;
}

export interface OrderData {
    bids: Order[];
    asks: Order[];
}
