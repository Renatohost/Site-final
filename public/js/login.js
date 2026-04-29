console.log("JS carregou");

// ==========================
// CADASTRAR USUÁRIO
// ==========================
async function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();
    alert(dados.message);

  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar com o servidor");
  }
}

// ==========================
// LOGIN
// ==========================
async function logar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha os campos!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Login realizado!");
      window.location.href = "home.html";
    } else {
      alert(dados.message);
    }

  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar com o servidor");
  }
}