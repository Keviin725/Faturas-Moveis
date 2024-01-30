import Invoice from "../Models/Invoice";

class InvoiceController {

    async create(req, res) {
        try {
            const { date, totalAmount, user, items } = req.body;

            // Validações
            if (!date || !totalAmount || !user || !items) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const invoice = await Invoice.create({
                date,
                totalAmount,
                user,
                items,
            });

            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar fatura', details: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const invoice = await Invoice.findById(id);

            if (!invoice) {
                return res.status(404).json({ error: 'Fatura não encontrada' });
            }

            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar fatura', details: error.message });
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;
            const { date, totalAmount, user, items } = req.body;

            // Validações
            if (!date || !totalAmount || !user || !items) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const invoice = await Invoice.findByIdAndUpdate(id, {
                date,
                totalAmount,
                user,
                items,
            }, { new: true });

            if (!invoice) {
                return res.status(404).json({ error: 'Fatura não encontrada' });
            }

            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar fatura', details: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedInvoice = await Invoice.findByIdAndRemove(id);

            if (!deletedInvoice) {
                return res.status(404).json({ error: 'Fatura não encontrada' });
            }

            res.json({ message: 'Fatura excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir fatura', details: error.message });
        }
    
    }

    async index(req, res) {
        try {
            const invoices = await Invoice.find();

            res.json(invoices);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar faturas', details: error.message });
        }
    }
}

export { InvoiceController }
