//Configuracao inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Ler o JSON / midddlewares
app.use(
    express.urlencoded({
        extended: true
    })
)


app.use(express.json())

// rotas da API
const router = require('./Routes/routes')

app.use( router)



// Credentials
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// Conectar a BD
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.w9z9nnv.mongodb.net/?retryWrites=true&w=majority`)

.then(() =>{
    console.log("Rocket Launched Successfully! 🚀")
    app.listen(3000)
})
.catch((err) => console.log(err))
