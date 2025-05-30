let cartaJogadorEscolhida = null;

const cartas = [
    { 
        nome: "Sailor Jupiter", 
        ataque: 30, 
        defesa: 25, 
        magia: 45, 
        imagem: "/static/assets/sailor_1.png" 
    },
    { 
        nome: "Super Trunfo", 
        ataque: 100, 
        defesa: 100, 
        magia: 100, 
        imagem: "/static/assets/supertrunfo.png" 
    },
    { 
        nome: "Sailor Vênus", 
        ataque: 45, 
        defesa: 25, 
        magia: 30, 
        imagem: "/static/assets/sailor_2.png" 
    },
    { 
        nome: "Sailor Marte", 
        ataque: 25, 
        defesa: 30, 
        magia: 45, 
        imagem: "/static/assets/sailor_3.png" 
    },
    { 
        nome: "Sailor Mercúrio", 
        ataque: 30, 
        defesa: 25, 
        magia: 45, 
        imagem: "/static/assets/sailor_4.png" 
    },
    { 
        nome: "Sailor Moon", 
        ataque: 25, 
        defesa: 45, 
        magia: 35, 
        imagem: "/static/assets/cartasailor.png" 
    }
];

// Função para sortear cartas
function sortearCartas() {
    // Embaralhar cartas
    const cartasEmbaralhadas = cartas.sort(() => Math.random() - 0.5);

    // Dividir cartas entre jogador e computador
    const cartasJogador = cartasEmbaralhadas.slice(0, 3);
    const cartasComputador = cartasEmbaralhadas.slice(3, 6);

    // Exibir cartas do jogador
    const divCartasJogador = document.querySelector(".cartas-jogador");
    divCartasJogador.innerHTML = ""; // Limpar cartas anteriores
    cartasJogador.forEach(carta => {
        divCartasJogador.innerHTML += `
            <div class="carta" onclick="escolherCartaJogador(${JSON.stringify(carta).replace(/"/g, '&quot;')})">
                <img src="${carta.imagem}" alt="${carta.nome}" width="140px">
                <p>${carta.nome}</p>
            </div>
        `;
    });

    // Exibir cartas do computador (ocultas inicialmente)
    const divCartasComputador = document.querySelector(".cartas-computador");
    divCartasComputador.innerHTML = ""; // Limpar cartas anteriores
    cartasComputador.forEach(carta => {
        divCartasComputador.innerHTML += `
            <div class="carta">
                <img src="${carta.imagem}" alt="${carta.nome}" width="140px" style="visibility: hidden;">
                <p style="visibility: hidden;">${carta.nome}</p>
            </div>
        `;
    });
}

function iniciarCombate(cartaJogador, cartaComputador, atributoEscolhido) {
    // Exibir a carta do jogador na shaw1
    const shaw1 = document.querySelector('.shaw1');
    shaw1.innerHTML = `
        <img src="${cartaJogador.imagem}" alt="${cartaJogador.nome}" class="carta-joga" width="140px">
        <p>${cartaJogador.nome} - ${atributoEscolhido}: ${cartaJogador[atributoEscolhido]}</p>
    `;

    // Exibir a carta do computador na shaw2
    const shaw2 = document.querySelector('.shaw2');
    shaw2.innerHTML = `
        <img src="${cartaComputador.imagem}" alt="${cartaComputador.nome}" class="carta-pc" width="140px">
        <p>${cartaComputador.nome} - ${atributoEscolhido}: ${cartaComputador[atributoEscolhido]}</p>
    `;

    // Comparar os atributos escolhidos
    const valorJogador = cartaJogador[atributoEscolhido];
    const valorComputador = cartaComputador[atributoEscolhido];

    let resultado = '';
    if (valorJogador > valorComputador) {
        resultado = 'Você venceu!';
    } else if (valorJogador < valorComputador) {
        resultado = 'Você perdeu!';
    } else {
        resultado = 'Empate!';
    }

    // Exibir o resultado
    const resultadoDiv = document.querySelector('.resultado');
    resultadoDiv.textContent = resultado;
    
}

function escolherCartaJogador(carta) {
    if (cartaJogadorEscolhida) {
        alert("Você já escolheu uma carta!");
        return;
    }

    cartaJogadorEscolhida = carta; // Armazena a carta escolhida

    // Exibir a carta do jogador imediatamente na shaw1
    const shaw1 = document.querySelector('.shaw1');
    shaw1.innerHTML = `
        <img src="${carta.imagem}" alt="${carta.nome}" width="140px">
        <p>${carta.nome}</p>
    `;

    // Mostrar os botões de atributos
    const atributosDiv = document.querySelector('.atributos');
    atributosDiv.innerHTML = `
        <button onclick="escolherAtributo('ataque')">Ataque</button>
        <button onclick="escolherAtributo('defesa')">Defesa</button>
        <button onclick="escolherAtributo('magia')">Magia</button>
    `;
}


function escolherAtributo(atributoEscolhido) {
    // Escolher uma carta aleatória para o computador
    const cartasComputador = cartas.slice(3, 6); // Supondo que as cartas do computador já foram sorteadas
    const cartaComputadorEscolhida = cartasComputador[Math.floor(Math.random() * cartasComputador.length)];

    // Iniciar o combate com o atributo escolhido
    iniciarCombate(cartaJogadorEscolhida, cartaComputadorEscolhida, atributoEscolhido);
}

function resetarJogo() {
    location.reload(); // Recarrega a página para reiniciar o jogo
}
