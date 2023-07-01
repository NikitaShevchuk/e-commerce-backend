import type { RequestHandler } from "express";
import InvoiceService from "./invoice.service";

class InvoiceController {
    download: RequestHandler = async (request, response, next) => {
        try {
            const id = request.params.id;
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", `attachment; filename="invoice-${id}.pdf"`);
            const result = await InvoiceService.download(response, id, request.session?.user._id);
            if (!result.success || result.document === undefined) {
                return response.status(422).json(result);
            } else {
                result.document.end();
            }
        } catch (error) {
            next(error);
        }
    };
}

export default new InvoiceController();
