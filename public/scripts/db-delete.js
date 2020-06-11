// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá efetuar as operações no BD
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto do banco de dados para as operações
db.serialize( () => {

    // Deletando um registro da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [50], function (err) {
    //db.run(`DELETE FROM places`, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
  
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