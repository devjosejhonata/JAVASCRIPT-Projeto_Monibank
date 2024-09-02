
// Função principal que verifica se um CPF é válido.
export default function ehUmCPF(campo) {

    // Remove os caracteres especiais (pontos e hífens) do valor do campo CPF.
    const cpf = campo.value.replace(/\.|-/g, "");

    // Valida o CPF verificando se é uma sequência repetida ou se os dígitos verificadores são válidos.
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {

        // Define uma mensagem de erro personalizada se o CPF não for válido.
        campo.setCustomValidity('Esse cpf não é válido');
    }
}

// Função que verifica se o CPF é uma sequência de números repetidos (ex.: '111.111.111-11').
function validaNumerosRepetidos(cpf) {
    
    // Lista de CPFs inválidos compostos por números repetidos.
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    // Verifica se o CPF fornecido está na lista de CPFs inválidos.
    return numerosRepetidos.includes(cpf);
}

// Função que valida o primeiro dígito verificador do CPF.
function validaPrimeiroDigito(cpf) {
    let soma = 0;  // Inicializa a variável de soma.
    let multiplicador = 10;  // Define o multiplicador inicial como 10.

    // Percorre os primeiros 9 dígitos do CPF para calcular a soma.
    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;  // Multiplica o dígito pelo multiplicador e adiciona à soma.
        multiplicador--;  // Decrementa o multiplicador.
    }

    // Calcula o primeiro dígito verificador.
    soma = (soma * 10) % 11;

    // Se a soma for 10 ou 11, o dígito verificador deve ser 0.
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna 'true' se o primeiro dígito verificador for inválido.
    return soma != cpf[9];
}

// Função que valida o segundo dígito verificador do CPF.
function validaSegundoDigito(cpf) {
    let soma = 0;  // Inicializa a variável de soma.
    let multiplicador = 11;  // Define o multiplicador inicial como 11.

    // Percorre os primeiros 10 dígitos do CPF para calcular a soma.
    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;  // Multiplica o dígito pelo multiplicador e adiciona à soma.
        multiplicador--;  // Decrementa o multiplicador.
    }

    // Calcula o segundo dígito verificador.
    soma = (soma * 10) % 11;

    // Se a soma for 10 ou 11, o dígito verificador deve ser 0.
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna 'true' se o segundo dígito verificador for inválido.
    return soma != cpf[10];
}
