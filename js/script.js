// Importa as funções de validação de CPF e de maioridade de outros módulos.
import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

// Seleciona todos os campos que são obrigatórios no formulário.
const camposDoFormulario = document.querySelectorAll('[required]');

// Seleciona o formulário que possui o atributo data-formulario.
const formulario = document.querySelector('[data-formulario]');

// Adiciona um ouvinte de evento para o evento de "submit" do formulário.
formulario.addEventListener("submit", (e) => {

    // Previne o comportamento padrão do formulário de recarregar a página ao enviar.
    e.preventDefault();

    // Cria um objeto com as respostas do formulário, pegando os valores dos campos pelo nome.
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    // Armazena os dados do formulário no localStorage do navegador.
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    // Redireciona o usuário para a segunda página do formulário.
    window.location.href = "./abrir-conta-form-2.html";
})

// Para cada campo obrigatório no formulário, adiciona ouvintes de evento.
camposDoFormulario.forEach((campo) => {

    // Adiciona um ouvinte de evento para o evento "blur" (quando o campo perde o foco).
    campo.addEventListener("blur", () => verificaCampo(campo));
    // Previne o comportamento padrão do HTML5 de mostrar a mensagem de erro.
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

// Lista dos tipos de erro que podem ocorrer nos campos de formulário.
const tiposDeErro = [
    'valueMissing',    // Campo vazio.
    'typeMismatch',    // Tipo de dado incorreto (ex.: texto em um campo de e-mail).
    'patternMismatch', // Padrão não correspondente (ex.: regex não correspondida).
    'tooShort',        // Valor muito curto.
    'customError'      // Erro personalizado definido via JavaScript.
]

// Objeto que contém mensagens de erro personalizadas para cada campo.
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

// Função que verifica a validade de um campo do formulário.
function verificaCampo(campo) {
    
    let mensagem = "";
    // Reseta a mensagem de erro personalizada.
    campo.setCustomValidity('');

    // Valida o CPF se o campo for de CPF e tiver um valor com 11 ou mais caracteres.
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    
    // Verifica se o campo é de data de nascimento e se não está vazio, e valida a maioridade.
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    // Para cada tipo de erro, verifica se o campo contém o erro.
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            // Define a mensagem de erro correspondente.
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem); // Exibe a mensagem no console (para debug).
        }
    })

    // Seleciona o elemento que exibirá a mensagem de erro, se houver.
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    
    // Verifica a validade do campo e exibe a mensagem de erro apropriada.
    const validadorDeInput = campo.checkValidity();
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem; // Exibe a mensagem de erro.
    } else {
        mensagemErro.textContent = ""; // Limpa a mensagem de erro.
    }
}
