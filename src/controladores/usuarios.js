const knex = require('../conexao')
const bcrypt = require('bcrypt')


async function cadastroDeUsuario(req, res) {
    const { username, senha } = req.body;

    if (!username || !senha) {
        return res.status(400).json({ mensagem: "Usuario e senha são obrigatorios!" })
    }

    try {

        const formato = await knex('usuarios').where('username', username).first()

        if (formato) {
            return res.status(400).json({ mensagem: "Nome de usuario já existe!" })
        }

        const crypt = await bcrypt.hash(senha, 10)

        const save = await knex('usuarios').insert({ username, senha: crypt }).returning('*')

        console.log(save) // array com o objt user

        return res.json("Cadastrado feito com sucesso!")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` });
    }
}


module.exports = {
    cadastroDeUsuario
}