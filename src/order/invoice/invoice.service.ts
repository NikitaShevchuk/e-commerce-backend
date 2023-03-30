import fs from "fs";
import path from "path";

class InvoiceService {
    async download(orderId: string): Promise<Buffer> {
        const invoicePath = path.join("public", "invoices", `invoice-${orderId}.pdf`);
        const invoice = fs.readFileSync(invoicePath);

        return invoice;
    }
}

export default new InvoiceService();
