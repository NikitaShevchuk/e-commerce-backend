import type { RequestHandler } from "express";
import InvoiceService from "./invoice.service";

class InvoiceController {
    download: RequestHandler = async (request, response, next) => {
        try {
            const result = await InvoiceService.download(request.params.id);
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader(
                "Content-Disposition",
                `attachment; filename="invoice-${request.params.id}.pdf"`
            );
            response.send(result);
        } catch (error) {
            next(error);
        }
    };

    upload: RequestHandler = async (request, response, next) => {
        try {
            console.log("upload invoice route");
        } catch (error) {
            next(error);
        }
    };
}

export default new InvoiceController();
