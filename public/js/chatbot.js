function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userMessage = input.value.trim();

    if (userMessage === '') return;

    addMessage(userMessage, 'user');
    input.value = '';

    setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        addMessage(botReply, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase().trim();

    if (
        input.includes('oi') ||
        input.includes('opa') ||
        input.includes('eai') ||
        input.includes('me ajuda')
    ) {
        return 'Olá! Me chamo Bitto 🤖 Como posso te ajudar? Para tirar dúvidas, digite "ajuda".';
    }

    else if (
        input.includes('ajuda') ||
        input.includes('quero saber') ||
        input.includes('pergunta') ||
        input.includes('socorro') ||
        input.includes('gostaria de saber')
    ) {
        return 'Qual dos tópicos atende à sua pergunta? 1️⃣ - Gostaria de expor o meu empreendimento  2️⃣ - Como sei que irei receber o serviço solicitado 3️⃣ - Gostaria de atendimento humano';
    }

    else if (
        input.includes('1') ||
        input.includes('gostaria de expor o meu empreendimento') ||
        input.includes('empreendimento') ||
        input.includes('11')
    ) {
        return 'Para expor o seu empreendimento em nosso site, acesse a aba “Quero me tornar um fornecedor de serviços Fixoo”, localizada no canto inferior esquerdo.';
    }

    else if (
        input.includes('2') ||
        input.includes('como sei que irei receber o serviço solicitado') ||
        input.includes('servico') ||
        input.includes('22')
    ) {
        return 'Quando você solicita um serviço, utilizamos um sistema de códigos. Após a conclusão do serviço, o prestador solicita ao usuário um código de confirmação, garantindo que o serviço foi realizado com sucesso.';
    }

    else if (input.includes('tchau')) {
        return 'Até mais! 👋';
    }

    else {
        return 'Desculpe, não entendi. Pode reformular?';
    }
}