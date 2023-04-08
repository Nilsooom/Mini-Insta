const knex = require('../conexao');
const bcrypt = require('bcrypt');
const s3 = require('../aws')


async function cadastroDeUsuario(req, res) {
    const { username, senha } = req.body;

    if (!username || !senha) {
        return res.status(400).json({ mensagem: "Usuario e senha são obrigatorios!" })
    }

    try {

        const validarUser = await knex('usuarios').where('username', username).first()

        if (validarUser) {
            return res.status(400).json({ mensagem: "Nome de usuario já existe!" })
        }

        const crypt = await bcrypt.hash(senha, 10)

        await knex('usuarios').insert({ username, senha: crypt }).returning('*')

        return res.status(201).json("Cadastrado efetuado com sucesso!")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }
}

async function perfilDeUsuario(req, res) {
    const { id: _, ...dadosPerfil } = req.usuario;

    return res.json(dadosPerfil)
}

async function atualizarPerfil(req, res) {
    const { nome, email, username, site, bio, genero, telefone, senha } = req.body;
    const { file } = req;
    const usuario = req.usuario;

    if (!nome && !email && !username && !site && !bio && !genero && !telefone && !senha && !file) {
        return res.status(401).json({ mensagem: "Nenhum campo foi enviado para atualização." })
    }

    try {

        const validar = await knex('usuarios').where({ id: usuario.id }).first()

        if (!validar) {
            return res.status(404).json({ mensagem: " Usuario não encontrado" })
        }

        //Deve se considerar que todas os dados serão enviados no body alterados ou não.
        if (username !== usuario.username) {
            const validarUser = await knex('usuarios').where({ username }).first()

            if (validarUser) {
                return res.status(400).json({ mensagem: "O Username informado já existe !" })
            }
        }

        if (email !== usuario.email) {
            const validarEmail = await knex('usuarios').where({ email }).first()

            if (validarEmail) {
                return res.status(400).json({ mensagem: "O Email informado já existe !" })
            }
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10)
        }

        let imagem = usuario.imagem
        if (file) {
            const upload = await s3.upload({
                Bucket: process.env.BUCKET_NAME,
                Key: `perfil/${usuario.username}/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype
            }).promise()

            imagem = upload.Location
        }

        await knex('usuarios').update({
            nome,
            imagem,
            username,
            site,
            bio,
            telefone,
            genero,
            senha
        }).where({ id: usuario.id })

        return res.status(201).json({ mensagem: "Perfil Atualizado!" })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }


}


module.exports = {
    cadastroDeUsuario,
    perfilDeUsuario,
    atualizarPerfil
}