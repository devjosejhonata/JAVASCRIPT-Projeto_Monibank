
// Seleciona o botão para iniciar a câmera.
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
// Seleciona o elemento que contém o campo da câmera.
const campoCamera = document.querySelector("[data-camera]");
// Seleciona o elemento de vídeo onde a câmera será exibida.
const video = document.querySelector("[data-video]");
// Seleciona o botão que permite tirar uma foto.
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
// Seleciona o elemento de canvas onde a imagem capturada será desenhada.
const canvas = document.querySelector("[data-video-canvas]");
// Seleciona a mensagem de confirmação ou aviso.
const mensagem = document.querySelector("[data-mensagem]");
// Seleciona o botão para enviar a foto tirada.
const botaoEnviarFoto = document.querySelector("[data-enviar]");

// Variável que armazenará a URL da imagem capturada.
let imagemURL = '';

// Adiciona um evento de clique ao botão de iniciar a câmera.
botaoIniciarCamera.addEventListener('click', async function () {

    // Solicita permissão para acessar a câmera do usuário (somente vídeo, sem áudio).
    const iniciarVideo = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });

    // Esconde o botão de iniciar câmera e mostra o campo da câmera.
    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    // Atribui o fluxo de vídeo da câmera ao elemento de vídeo na página.
    video.srcObject = iniciarVideo;
});

// Adiciona um evento de clique ao botão de tirar foto.
botaoTirarFoto.addEventListener('click', function () {

    // Desenha a imagem atual do vídeo no canvas.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte o conteúdo do canvas em uma URL de imagem (formato JPEG).
    imagemURL = canvas.toDataURL('image/jpeg');

    // Esconde o campo da câmera e mostra a mensagem de confirmação.
    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

// Adiciona um evento de clique ao botão de enviar foto.
botaoEnviarFoto.addEventListener('click', () => {

    // Obtém os dados de cadastro já existentes no localStorage.
    const receberDadosExistentes = localStorage.getItem("cadastro");
    
    // Converte os dados de volta para um objeto JavaScript.
    const converteRetorno = JSON.parse(receberDadosExistentes);

    // Adiciona a URL da imagem ao objeto de dados do cadastro.
    converteRetorno.imagem = imagemURL;

    // Armazena o objeto atualizado de volta ao localStorage.
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    // Redireciona o usuário para a próxima página do formulário.
    window.location.href = '../pages/abrir-conta-form-3.html';
});
