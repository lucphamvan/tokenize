import axios from "axios";
import { getRandomArbitrary } from "utils";
import { v4 as uuidv4 } from "uuid";

const SYMBOL = "ETHBTC";
const MARKET_PRICE_URL = (symbol: string) => `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1`;

// const marketDataSample = {
//     lastUpdateId: 6226396212,
//     bids: [["0.07585100", "11.88410000"]],
//     asks: [["0.07585200", "29.46530000"]],
// };

class OrderService {
    /**
     * generate exchange order data by call API
     * @param listSize size of list
     * @returns
     */
    public async generateListOrders(listSize: number) {
        const bestOrder = await this.getBestOrderByAPI(SYMBOL);
        const bidOrders = this.generateBidOrders(bestOrder.bids, listSize);
        const askOrders = this.generateAskOrders(bestOrder.asks, listSize);
        const listOrder: OrderData = {
            asks: askOrders,
            bids: bidOrders,
        };
        return listOrder;
    }

    /**
     * generate exchange order data from binance's stream data
     * @param data : string data from stream
     * @param listSize
     * @returns
     */
    public generateListOrdersByStream(data: string, listSize: number) {
        const bestOrder = this.getBestOrderFromStreamData(data);
        const bidOrders = this.generateBidOrders(bestOrder.bids, listSize);
        const askOrders = this.generateAskOrders(bestOrder.asks, listSize);
        const listOrder: OrderData = {
            asks: askOrders,
            bids: bidOrders,
        };
        return listOrder;
    }

    private generateBidOrders(bestBidOrder: Order, listSize: number) {
        const maxSizePrice = 5 / listSize; // max (size * price) per generate
        const maxPrice = bestBidOrder.price; // another bid order has price less than this price
        const maxSize = maxSizePrice / maxPrice; // contrains sum (size * price ) < 5

        // genarate first ask order
        const firstOrder = { ...bestBidOrder, size: getRandomArbitrary(0, maxSize) };
        // list bidOders
        const bidOrders: Order[] = [firstOrder];
        // generate another bids orders
        for (let i = 0; i < listSize - 1; i++) {
            const order: Order = {
                id: uuidv4(),
                userId: uuidv4(),
                price: getRandomArbitrary(maxPrice * 0.9, maxPrice),
                size: getRandomArbitrary(0, maxSize),
            };
            bidOrders.push(order);
        }
        // sort bids order
        bidOrders.sort((a, b) => {
            if (a.price < b.price) {
                return 1;
            }
            if (a.price > b.price) {
                return -1;
            }
            return 0;
        });
        // console.log(bidOrders);
        return bidOrders;
    }

    private generateAskOrders(bestAskOrder: Order, listSize: number) {
        const maxSize = 150 / listSize; // constrain sum of ask size < 150
        const minPrice = bestAskOrder.price; // another order has price more than this price

        // genarate first ask order
        const firstOrder = { ...bestAskOrder, size: getRandomArbitrary(0, maxSize) };

        // list askOrders
        const askOrders: Order[] = [firstOrder];
        // generate another ask orders
        for (let i = 0; i < listSize - 1; i++) {
            const order: Order = {
                id: uuidv4(),
                userId: uuidv4(),
                price: getRandomArbitrary(minPrice, 1.5 * minPrice),
                size: getRandomArbitrary(0, maxSize),
            };
            askOrders.push(order);
        }

        // sort ask order
        askOrders.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        });

        // console.log(askOrders);
        return askOrders;
    }

    /**
     * get best order from real market (Binance) from call API
     * @param symbol
     * @returns
     */
    private async getBestOrderByAPI(symbol: string) {
        const response = await axios.get(MARKET_PRICE_URL(symbol));
        const bestBid: Order = {
            id: uuidv4(),
            userId: uuidv4(),
            price: Number(response.data.bids[0][0]),
            size: Number(response.data.bids[0][1]),
        };
        const bestAsk: Order = {
            id: uuidv4(),
            userId: uuidv4(),
            price: Number(response.data.asks[0][0]),
            size: Number(response.data.asks[0][1]),
        };

        // console.log("bestBid", bestBid);
        // console.log("bestAsk", bestAsk);

        return { bids: bestBid, asks: bestAsk };
    }

    private getBestOrderFromStreamData(data: string) {
        // dataObj = { "u": 6228224033, "s": "ETHBTC", "b": "0.07477300", "B": "19.49680000", "a": "0.07477400", "A": "7.02420000" }
        const dataObj = JSON.parse(data);
        const bestBid: Order = {
            id: uuidv4(),
            userId: uuidv4(),
            price: Number(dataObj.b),
            size: Number(dataObj.B),
        };
        const bestAsk: Order = {
            id: uuidv4(),
            userId: uuidv4(),
            price: Number(dataObj.a),
            size: Number(dataObj.A),
        };
        return { bids: bestBid, asks: bestAsk };
    }
}

export default new OrderService();
