require('dotenv').config()

const rota = require('./rotas');
const express = require('express');

const app = express();

app.use(express.json());
app.use(rota)




app.listen(process.env.PORT, () => {
    console.log(`Conectado a porta ${process.env.PORT}`)
})