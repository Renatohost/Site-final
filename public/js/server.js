const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// conecta e cria banco (se não existir)
const db = new sqlite3.Database("./usuarios.db", (err) => {
  if (err) return console.log(err);
  console.log("Banco conectado!");
});

// cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT UNIQUE,
  senha TEXT
)`);

// rota de cadastro
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  db.run(
    `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senha],
    (err) => {
      if (err) {
        res.json({ erro: "Email já cadastrado" });
      } else {
        res.json({ sucesso: true });
      }
    }
  );
});

// rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.get(
    `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
    [email, senha],
    (err, row) => {
      if (row) {
        res.json({ sucesso: true, nome: row.nome });
      } else {
        res.json({ sucesso: false });
      }
    }
  );
});

// inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
