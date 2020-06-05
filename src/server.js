const express = require("express")
const server = express()

//Configurando pasta pública
server.use(express.static("public"))

// Configurar caminhos ou rotas do servidor
// Página inicial
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
// Pontos de coleta
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})
// Resultado da pesquisa
server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})

// Subindo o servidor
server.listen(3001)
console.log("Listen port:3001")


// Instalar o Nodemon para atualizar servidor durante o desenvolvimento
// Rode: npm install nodemon -D