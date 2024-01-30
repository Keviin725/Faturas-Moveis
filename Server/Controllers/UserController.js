import User from "../Models/User";

class UserController {

    async create(req, res) {
        try {
            const { username, email } = req.body;

            // Validações
            if (!username || !email) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const user = await User.create({
                username,
                email,
            });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { username, email } = req.body;

            // Validações
            if (!username || !email) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            const user = await User.findByIdAndUpdate(id, {
                username,
                email,
            }, { new: true });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedUser = await User.findByIdAndRemove(id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir usuário', details: error.message });
        }
    }

    async index(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
        }
    }
}

export { UserController }
