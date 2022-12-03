interface Order {
    id: string;
    price: number;
    size: number;
    userId: string;
}

interface OrderData {
    bids: Order[];
    asks: Order[];
}
