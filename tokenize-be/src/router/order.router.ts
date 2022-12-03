import { Router } from "express";
import orderService from "service/order.service";

const router = Router();
router.get("/orders", async (req, res) => {
    try {
        const data = await orderService.generateListOrders(10);
        res.status(200).json(data);
    } catch (error: any) {
        console.log("failed to get orders data", error.message);
        res.status(400).json({ error: error.message });
    }
});

export default router;
