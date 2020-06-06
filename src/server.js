const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurando pasta pública
server.use(express.static("public"))


// Utilizando template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos ou rotas do servidor

// Página inicial
// Usando template engine
//res.sendFile(__dirname + "/views/index.html")  

// Usando template engine     
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})
// Pontos de coleta
// Usando template engine
//res.sendFile(__dirname + "/views/create-point.html")

// Usando template engine
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
// Resultado da pesquisa
// Usando template engine
//res.sendFile(__dirname + "/views/search-results.html")

// Usando template engine
server.get("/search", (req, res) => {
        // Consultar os dados da tabela
        db.all(`SELECT * FROM places`, function(err, rows) {
            if(err) {
                console.log(err)
            }

            const total = rows.length

            // mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total: total})
        }) 
})

// Subindo o servidor
server.listen(3001)
console.log("Listen port:3001")


// Instalar o Nodemon para atualizar servidor durante o desenvolvimento
// Rode: npm install nodemon -D