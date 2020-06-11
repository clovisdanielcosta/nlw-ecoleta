const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurando pasta pública
server.use(express.static("public"))

//Hsbilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

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

// Enviando os dados do formulário
server.post("/save-point", (req, res) => {
    // req.query: Query Strings da aplicação como ?, =, etc que aparece na url.
    // console.log(req.body)
    // console.log("OK")
    
    // Inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?);`
        
        const values = [
            req.body.name,
            req.body.image,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ] 
        
        function afterInsertData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            } 
            console.log("Cadastrado com sucesso!")
            console.log(this)

            return res.render("create-point.html", { saved: true })
        }    
    db.run(query, values, afterInsertData)

})

// Resultado da pesquisa
// Usando template engine
//res.sendFile(__dirname + "/views/search-results.html")

// Usando template engine
server.get("/search", (req, res) => {

    const search = req.query.search
    
    if (search == "") {
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }
        // Consultar os dados da tabela
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            if(err) {
                console.log(err)
            }

            const total = rows.length

            // mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total: total })
        }) 
})

// Subindo o servidor
//server.listen(3001)
server.listen(process.env.PORT || 3001)
console.log("Listen port:3001")


// Instalar o Nodemon para atualizar servidor durante o desenvolvimento
// Rode: npm install nodemon -D