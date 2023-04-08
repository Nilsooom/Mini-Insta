const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


async function login(req, res) {
    const { username, senha } = req.body;

    if (!username || !senha) {
        return res.status(400).json({ mensagem: "Usuario e senha são obrigatorios!" })
    }

    try {

        const verifyUser = await knex('usuarios').where('username', username).first()

        if (!verifyUser) {
            return res.status(404).json({ mensagem: "O usuario não existe!" })
        }

        const verifyPass = await bcrypt.compare(senha, verifyUser.senha)

        if (!verifyPass) {
            return res.status(401).json({ mensagem: "Senha inválida" })
        }

        const token = jwt.sign({ id: verifyUser.id }, process.env.SENHA_HASH, { expiresIn: '8h' })

        const { senha: _, ...usuario } = verifyUser

        return res.json({ usuario, token })

    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }
}

module.exports = login