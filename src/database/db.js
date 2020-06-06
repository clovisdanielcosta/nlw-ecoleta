// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá efetuar as operações no BD
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto do banco de dados para as operações
db.serialize( () => {
    // Criar uma tabela
     db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    
    // Inserir dados na tabela
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
        "Colectoria",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5ARSFrfhP3TS61ueCvwO67g1c3CUNzsDPKLcwr0qmvcWLimLI&usqp=CAU",
        "Guilherme Gembala, Jardim América",
        "260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
        ] 
    
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        } 
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }    
    db.run(query, values, afterInsertData)
    
/*    
    // Deletando um registro da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [4], function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
*/  
    // Consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            console.log(err)
        }
        console.log("Aqui estão seus registros.")
        console.log(rows);        
    }) 
})

module.exports = db