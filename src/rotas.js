const user = require('./controladores/usuarios')
const login = require('./controladores/login')
const autenticarUsuario = require('./filtros/autenticacao');
const { Router } = require('express');

const rota = Router()



//Rotas de Usuario:

rota.post('/usuario/cadastro', user.cadastroDeUsuario);

//Loguin

rota.post('/login', login);

// next
rota.use(autenticarUsuario)







module.exports = rota