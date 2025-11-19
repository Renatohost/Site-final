const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Permitir receber JSON do front-end
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Criar ou conectar ao banco SQLite
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Banco SQLite conectado!");
  }
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL
  )
`);

// Rota para salvar e-mail
app.post("/cadastro", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mail é obrigatório." });
  }

  db.run("INSERT INTO emails (email) VALUES (?)", [email], (err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao salvar no banco." });
    }
    res.json({ message: "E-mail salvo com sucesso!" });
  });
});

// Rota para o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
