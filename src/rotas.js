const user = require('./controladores/usuarios');
const login = require('./controladores/login');
const autenticarUsuario = require('./filtros/autenticacao');
const multer = require('./multer');
const { Router } = require('express');

const rota = Router()


//Loguin:
rota.post('/login', login);

//Rotas de Usuario:
rota.post('/usuario/cadastro', user.cadastroDeUsuario);

//Rotas com autenticação de usuario:
rota.use(autenticarUsuario);
rota.get('/usuario/perfil', user.perfilDeUsuario);
rota.post('/usuario/perfil', multer.single('foto'), user.atualizarPerfil);







module.exports = rota