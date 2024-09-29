const regexAutoria = /^[A-Za-zÀ-ÿ\s'\-]{3,30}$/;

// Exemplos de Uso:
const autoriaValida1 = "Maria";
const autoriaValida2 = "João da Silva";
const autoriaValida3 = "Anne-Marie";
const autoriaValida4 = "O'Connor";
const autoriaInvalida1 = "Jo"; // Menos de 3 caracteres
const autoriaInvalida2 = "123"; // Contém números

// console.log(regexAutoria.test(autoriaValida1)); // true
// console.log(regexAutoria.test(autoriaValida2)); // true
// console.log(regexAutoria.test(autoriaValida3)); // true
// console.log(regexAutoria.test(autoriaValida4)); // true
// console.log(regexAutoria.test(autoriaInvalida1)); // false
// console.log(regexAutoria.test(autoriaInvalida2)); // false

const regexConteudo = /^[A-Za-zÀ-ÿ0-9\s\.,!?;:'"\-\(\)]{30,}$/;

// Exemplos de Uso:
const conteudoValido = "O'connor";
const conteudoInvalido = "Curto!";

console.log(regexConteudo.test(conteudoValido)); // true
console.log(regexConteudo.test(conteudoInvalido)); // false