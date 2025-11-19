
const KEY_USUARIOS = 'usuarios_app_demo';
const KEY_SESSAO = 'usuario_logado';

function pegarUsuarios() {
  const raw = localStorage.getItem(KEY_USUARIOS);
  return raw ? JSON.parse(raw) : [];
}

function salvarUsuarios(lista) {
  localStorage.setItem(KEY_USUARIOS, JSON.stringify(lista));
}

function salvarSessao(usuario) {
  localStorage.setItem(KEY_SESSAO, JSON.stringify(usuario));
}

function limparSessao() {
  localStorage.removeItem(KEY_SESSAO);
}

function pegarSessao() {
  const raw = localStorage.getItem(KEY_SESSAO);
  return raw ? JSON.parse(raw) : null;
}


function logar() {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  const nome = nomeInput ? nomeInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const senha = senhaInput ? senhaInput.value : '';

  if (nome === "" || email === "" || senha === "") {
    alert("Preencha todos os campos!");
    return;
  }


  const usuarios = pegarUsuarios();
  const encontrado = usuarios.find(u => u.email === email && u.senha === senha);

  if (encontrado) {
    salvarSessao({ nome: encontrado.nome, email: encontrado.email });

    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha inválidos. Verifique ou cadastre-se.");
  }
}


function entrarSemLogin() {

  salvarSessao({ nome: 'Visitante', email: '' });
  window.location.href = "home.html";
}

function irParaCadastro() {
  window.location.href = "cadastro.html";
}

function irParaLogin() {
  window.location.href = "index.html";
}


function cadastrarUsuario() {
  const nome = document.getElementById('nomeCadastro').value.trim();
  const email = document.getElementById('emailCadastro').value.trim().toLowerCase();
  const senha = document.getElementById('senhaCadastro').value;
  const conf = document.getElementById('confSenhaCadastro').value;

  if (!nome || !email || !senha || !conf) {
    alert('Preencha todos os campos.');
    return;
  }


  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('E-mail inválido.');
    return;
  }

  if (senha.length < 4) {
    alert('Senha muito curta (mínimo 4 caracteres).');
    return;
  }

  if (senha !== conf) {
    alert('As senhas não conferem.');
    return;
  }

  const usuarios = pegarUsuarios();


  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    alert('Já existe um usuário com esse e-mail. Faça login ou use outro e-mail.');
    return;
  }


  const novo = { nome, email, senha };
  usuarios.push(novo);
  salvarUsuarios(usuarios);


  salvarSessao({ nome: novo.nome, email: novo.email });

  alert('Cadastro realizado com sucesso! Você será redirecionado.');
  window.location.href = "index.html";
}


function inicializarHome() {
  const sessao = pegarSessao();
  const msg = document.getElementById('msgUsuario');
  if (!sessao) {

    window.location.href = "index.html";
    return;
  }
  if (msg) {
    msg.innerText = `Olá, ${sessao.nome || 'Usuário'} — você está logado.`;
  }
}

function logout() {
  limparSessao();
  window.location.href = "index.html";
}


if (window.location.pathname.endsWith('home.html')) {

  document.addEventListener('DOMContentLoaded', inicializarHome);
}
