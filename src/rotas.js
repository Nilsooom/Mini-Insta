const user = require('./controladores/usuarios');
const post = require('./controladores/postagens')
const login = require('./controladores/login');

const multer = require('./multer');
const autenticarUsuario = require('./filtros/autenticacao');
const { Router } = require('express');


const rota = Router()

//Cadastro de Usuario:
rota.post('/usuario/cadastro', user.cadastroDeUsuario);


//Loguin:
rota.post('/login', login);


//Validação de usuario logado:
rota.use(autenticarUsuario);


//Rotas de Usuario com validação de token:
rota.get('/usuario/perfil', user.perfilDeUsuario);
rota.put('/usuario/perfil', multer.single('foto'), user.atualizarPerfil);

//Postagens:
rota.post('/usuario/postagem', post.newPost);
rota.post('/usuario/postagem/:postagem_id/curtir', post.curtir)






module.exports = rota