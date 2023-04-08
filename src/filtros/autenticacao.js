const knex = require('../conexao');
const jwt = require('jsonwebtoken');


async function autenticarUsuario(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado')
    }

    try {

        const token = authorization.replace('Bearer ', '').trim()

        const { id } = jwt.verify(token, process.env.SENHA_HASH)

        const buscar = await knex('usuarios').where({ id }).first()

        //Caso usuario tenha um token valído mas usuario foi deletado.
        if (!buscar) { return res.status(400).json({ mensagem: "Não autorizado" }) }

        const { senha: _, ...dadosUsuario } = buscar

        req.usuario = dadosUsuario

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }
}

module.exports = autenticarUsuario