const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3001;

// ==========================
// MIDDLEWARE
// ==========================
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==========================
// BANCO DE DADOS
// ==========================
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Banco SQLite conectado!");
  }
});

// ==========================
// CRIAR TABELAS
// ==========================
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS estabelecimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    tipo TEXT,
    latitude REAL,
    longitude REAL
  )
`);

// ==========================
// ROTAS DE TESTE
// ==========================
app.get("/teste", (req, res) => {
  res.send("Servidor funcionando!");
});

// Página inicial
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// ==========================
// USUÁRIOS
// ==========================

// CADASTRO
app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  db.run(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ message: "E-mail já cadastrado" });
        }
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
      }

      res.json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: "Erro no servidor" });
      }

      if (!row) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      res.json({
        message: "Login realizado com sucesso!",
        usuario: {
          id: row.id,
          nome: row.nome,
          email: row.email
        }
      });
    }
  );
});

// ==========================
// ESTABELECIMENTOS
// ==========================

// CADASTRAR
app.post("/estabelecimentos", (req, res) => {
  const { nome, tipo, latitude, longitude } = req.body;

  if (!nome || !latitude || !longitude) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  db.run(
    "INSERT INTO estabelecimentos (nome, tipo, latitude, longitude) VALUES (?, ?, ?, ?)",
    [nome, tipo, latitude, longitude],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao salvar local" });
      }

      res.json({ message: "Estabelecimento cadastrado!" });
    }
  );
});

// LISTAR
app.get("/estabelecimentos", (req, res) => {
  db.all("SELECT * FROM estabelecimentos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar locais" });
    }

    res.json(rows);
  });
});

// ==========================
// INICIAR SERVIDOR
// ==========================
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});