const knex = require('../conexao');


async function newPost(req, res) {
    const { texto, fotos } = req.body;
    const { id } = req.usuario;

    if (!fotos || fotos.lenght <= 0) {
        return res.staus(401).json({ mensagem: "È necesssario enviar ao menos uma foto." })
    }

    try {

        const post = await knex('postagens')
            .insert({ texto, usuario_id: id }).returning('*')

        if (!post) {
            return res.status(400).json({ mensagem: "Não foi possível realizar a postagem." })
        }

        //Cria uma nova propriedade dentro do array de foto com o id do post

        for (let foto of fotos) {
            foto.postagem_id = post[0].id
        }
        //Deste modo array de fotos contem as duas prop para a tabela de postagem_fotos
        const postPic = await knex('postagem_fotos').insert(fotos)

        if (!postPic) {
            await knex('postagens').where({ postagem_id: post[0].id }).del() //Apaga a postagem acima para não gerar problema.
            return res.status(400).json({ mensagem: "Não foi possível realizar a postagem." })
        }

        return res.status(201).json({ mensagem: "Postagem realizada com sucesso!" })
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }
}

async function curtir(req, res) {
    const { postagem_id } = req.params;
    const { id } = req.usuario;

    try {

        const post = await knex('postagens').where({ id: postagem_id }).first()

        if (!post) {
            return res.status(404).json({ mensagem: "Postagem não encontrada" })
        }

        const verificarCurtida = await knex('postagem_curtidas').where({ usuario_id: id, postagem_id: post.id }).first()

        if (verificarCurtida) {
            return res.status(404).json({ mensagem: "Usuario já curtiu esta postagem." })
        }

        const curtida = await knex('postagem_curtidas')
            .insert({ usuario_id: id, postagem_id: post.id })

        if (!curtida) {
            return res.status(400).json({ mensagem: "Não foi possivel curtir está postagem." })
        }

        return res.json({ mensagem: "Curtida enviada!" })

    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do servidor. Error: ${error.message}` })
    }

}

module.exports = {
    newPost,
    curtir
}