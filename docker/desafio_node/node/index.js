const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const createTableSql = `
    CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );
`;
connection.query(createTableSql, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err);
    return;
  }

  const insertSql = `INSERT INTO people(name) values('Pedro')`;
  connection.query(insertSql, (err) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
    }
  });
});

app.get("/", (req, res) => {
  const selectSql = `SELECT * FROM people`;
  connection.query(selectSql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados:", err);
      res.status(500).send("Erro ao buscar dados");
      return;
    }

    let responseHtml = "<h1>Full Cycle</h1><ul>";
    results.forEach((person) => {
      responseHtml += `<li>${person.name}</li>`;
    });
    responseHtml += "</ul>";

    res.send(responseHtml);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
