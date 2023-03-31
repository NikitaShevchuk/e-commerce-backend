import fs from "fs";
import type { IOrder } from "../../models/types/order";
import path from "path";
import PDFDocument from "pdfkit";
import type { Response } from "express";

class InvoiceHelper {
    createInvoice(order: IOrder, response: Response, orderId: string): PDFKit.PDFDocument {
        const invoicePath = this.checkForDirectoryAndCreatePath(orderId);
        const document = new PDFDocument();
        document.pipe(fs.createWriteStream(invoicePath));
        document.pipe(response);
        this.writeTitle(document, orderId);
        this.reduceProductsPrice(document, order);
        return document;
    }

    private writeTitle(document: PDFKit.PDFDocument, orderId: string): void {
        document.fontSize(26).text("INVOICE");
        document.fontSize(16).text(`Order number: ${orderId}`);
        document.text(" ");
    }

    private reduceProductsPrice(document: PDFKit.PDFDocument, order: IOrder): void {
        let totalPrice = 0;
        order.products.forEach(({ product, quantity }) => {
            if (product === null) return;
            totalPrice += product.price * quantity;
            document.fontSize(14).text(`${product.title} - ${quantity} x $${product.price}`);
        });
        document.text(" ");
        document.fontSize(16).text(`Total Price: $${totalPrice}`, { underline: true });
    }

    private checkForDirectoryAndCreatePath(orderId: string): string {
        const invoiceDir = path.join("public", "invoices");
        if (!fs.existsSync(invoiceDir)) {
            fs.mkdirSync(invoiceDir);
        }
        return path.join(invoiceDir, `invoice-${orderId}.pdf`);
    }
}

export default new InvoiceHelper();
