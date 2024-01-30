import Quotation from "../Models/Quotation";

class QuotationController {

    async create(req, res) {
        try {
            const { dateCreated, expirationDate, items, user } = req.body;

            // Validações
            if (!dateCreated || !expirationDate || !items || !user) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const quotation = await Quotation.create({
                dateCreated,
                expirationDate,
                items,
                user,
            });

            res.json(quotation);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cotação', details: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const quotation = await Quotation.findById(id);

            if (!quotation) {
                return res.status(404).json({ error: 'Cotação não encontrada' });
            }

            res.json(quotation);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cotação', details: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { dateCreated, expirationDate, items, user } = req.body;

            // Validações
            if (!dateCreated || !expirationDate || !items || !user) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const quotation = await Quotation.findByIdAndUpdate(id, {
                dateCreated,
                expirationDate,
                items,
                user,
            }, { new: true });

            if (!quotation) {
                return res.status(404).json({ error: 'Cotação não encontrada' });
            }

            res.json(quotation);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar cotação', details: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedQuotation = await Quotation.findByIdAndRemove(id);

            if (!deletedQuotation) {
                return res.status(404).json({ error: 'Cotação não encontrada' });
            }

            res.json({ message: 'Cotação excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir cotação', details: error.message });
        }
    }

    async index(req, res) {
        try {
            const quotations = await Quotation.find();

            res.json(quotations);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cotações', details: error.message });
        }
    }
}

export { QuotationController }
