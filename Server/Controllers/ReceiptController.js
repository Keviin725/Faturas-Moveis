import Receipt from "../Models/Receipt";

class ReceiptController {

    async create(req, res) {
        try {
            const { datePaid, paymentMethod, amountPaid, invoice } = req.body;

            // Validações
            if (!datePaid || !paymentMethod || !amountPaid || !invoice) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const receipt = await Receipt.create({
                datePaid,
                paymentMethod,
                amountPaid,
                invoice,
            });

            res.json(receipt);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar recibo', details: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const receipt = await Receipt.findById(id);

            if (!receipt) {
                return res.status(404).json({ error: 'Recibo não encontrado' });
            }

            res.json(receipt);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar recibo', details: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { datePaid, paymentMethod, amountPaid, invoice } = req.body;

            // Validações
            if (!datePaid || !paymentMethod || !amountPaid || !invoice) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const receipt = await Receipt.findByIdAndUpdate(id, {
                datePaid,
                paymentMethod,
                amountPaid,
                invoice,
            }, { new: true });

            if (!receipt) {
                return res.status(404).json({ error: 'Recibo não encontrado' });
            }

            res.json(receipt);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar recibo', details: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedReceipt = await Receipt.findByIdAndRemove(id);

            if (!deletedReceipt) {
                return res.status(404).json({ error: 'Recibo não encontrado' });
            }

            res.json({ message: 'Recibo excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir recibo', details: error.message });
        }
    }

    async index(req, res) {
        try {
            const receipts = await Receipt.find();

            res.json(receipts);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar recibos', details: error.message });
        }
    }
}

export { ReceiptController }
