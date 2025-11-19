function copiarPix() {
  const codigo = document.getElementById('codigoPix').textContent;
  navigator.clipboard.writeText(codigo).then(() => {
    alert('Código PIX copiado!');
  }).catch(() => {
    alert('Falha ao copiar o código PIX.');
  });
}

function finalizarPagamento() {
  const dinheiroCheck = document.getElementById('dinheiroCheckbox').checked;
  alert('Pedido finalizado!\nForma de pagamento selecionada: ' + (dinheiroCheck ? 'Dinheiro' : 'Outro método'));
}