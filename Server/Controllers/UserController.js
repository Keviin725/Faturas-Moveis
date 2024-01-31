import User from "../Models/User";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {

    async login(req, res) {
        try {
            const { email, password } = req.body

            //validations
            if (!email) {
                return res.status(422).json({ error: 'O email e obrigatorio' })

            }
            if (!password) {
                return res.status(422).json({ error: 'A senha e obrigatoria' })

            }
            // Verificar se o user existe
            const user = await User.findOne({ email: email })

            if (!user) {
                return res.status(422).json({ error: 'user nao encontrado' })
            }

            // password validation
            const verifyPassword = await bcrypt.compare(password, user.password)

            if (!verifyPassword) {
                return res.status(404).json({ message: 'Password Incorreta' })
            }


            const secret = process.env.SECRET
            const token = jwt.sign({
                id: user._id
            }, secret)

            res.status(200).json(token)

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
        }
    }

    async create(req, res) {
        try {
            const { username, email } = req.body;

            // Validações
            if (!username || !email) {
                return res.status(422).json({ error: 'Todos os campos são obrigatórios' });
            }

            // Verificar se o user existe
            const userExists = await User.findOne({ email: email })

            if (userExists) {
                return res.status(422).json({ error: 'Este email ja existe, utilize outro' })
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
