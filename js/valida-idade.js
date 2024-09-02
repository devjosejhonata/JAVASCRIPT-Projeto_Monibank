
// Função principal que verifica se o usuário é maior de idade.
export default function ehMaiorDeIdade(campo) {
    
    // Converte o valor do campo de data de nascimento em um objeto Date.
    const dataNascimento = new Date(campo.value);

    // Verifica se a data de nascimento corresponde a uma idade menor de 18 anos.
    if (!validaIdade(dataNascimento)) {
        // Define uma mensagem de erro personalizada se o usuário não for maior de idade.
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

// Função que valida se a idade é maior ou igual a 18 anos.
function validaIdade(data) {
    // Obtém a data atual.
    const dataAtual = new Date();

    // Calcula a data correspondente a 18 anos após a data de nascimento.
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    // Retorna 'true' se a data atual for igual ou superior a "dataMais18", indicando que o usuário tem 18 anos ou mais.
    return dataAtual >= dataMais18;
}
