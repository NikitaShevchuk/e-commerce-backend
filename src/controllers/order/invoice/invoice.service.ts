import type { Response } from "express";
import OrderRepository from "../order.repository";
import InvoiceHelper from "./invoice.helper";

interface DocumentCreationResult {
    success: boolean;
    document?: PDFKit.PDFDocument;
    message?: string;
}

class InvoiceService {
    async download(
        response: Response,
        orderId: string,
        userId: string
    ): Promise<DocumentCreationResult> {
        const order = await OrderRepository.getById(orderId, userId);
        if (order === null) return { success: false, message: "Order with this id doesn't exist" };
        const document = InvoiceHelper.createInvoice(order, response, orderId);
        return {
            success: true,
            document
        };
    }
}

export default new InvoiceService();
