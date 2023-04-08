require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json("Teste ok")
})


app.listen(process.env.PORT, () => {
    console.log(`Conectado a porta ${process.env.PORT}`)
})
