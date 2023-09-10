// Variável global que busca o elemento do "visor" - input readonly do HTML
let inputResultado = document.getElementById("inputCalculadora");
// Objeto que registra os valores e funções do cálculo
let calculo = {
  valorSalvo: null,
  funcaoParaCalcular: null,
};
//Ao carregar a página, atribui eventos aos botões por meio dos seus identificadores (ids)
window.addEventListener("load", function () {
  atribuirEventos();
});

function atribuirEventos() {
  //Atribui eventos aos números
  document.getElementById("btnValor0").addEventListener("click", inserirNumero);
  document.getElementById("btnValor1").addEventListener("click", inserirNumero);
  document.getElementById("btnValor2").addEventListener("click", inserirNumero);
  document.getElementById("btnValor3").addEventListener("click", inserirNumero);
  document.getElementById("btnValor4").addEventListener("click", inserirNumero);
  document.getElementById("btnValor5").addEventListener("click", inserirNumero);
  document.getElementById("btnValor6").addEventListener("click", inserirNumero);
  document.getElementById("btnValor7").addEventListener("click", inserirNumero);
  document.getElementById("btnValor8").addEventListener("click", inserirNumero);
  document.getElementById("btnValor9").addEventListener("click", inserirNumero);
  //Atribui eventos aos botões de operadores, ponto e resultado
  document.getElementById("btnPonto").addEventListener("click", inserirNumero);
  document.getElementById("btnSoma").addEventListener("click", clicarOperador);
  document.getElementById("btnDividir").addEventListener("click", clicarOperador);
  document.getElementById("btnMultiplicar").addEventListener("click", clicarOperador);
  document.getElementById("btnSubtrair").addEventListener("click", clicarOperador);
  document.getElementById("btnOperPorc").addEventListener("click", clicarOperador);
  document.getElementById("btnRaizQ").addEventListener("click", raizQF);
  document.getElementById("btnQuadrado").addEventListener("click", quadradroF);
  document.getElementById("btnDivX").addEventListener("click", divideX);
  document.getElementById("btnLimpar").addEventListener("click", limparDados);
  document.getElementById("btnOperCE").addEventListener("click", limparInput);
  document.getElementById("btnValorInv").addEventListener("click", inverteSinal);
  document.getElementById("btnResultado").addEventListener("click", clicarResultado);
  document.getElementById("btnApagar").addEventListener("click", apagaDireita);
}
// Adiciona o número no visor
function inserirNumero() {
  // Se o valor não for um número, substitui pelo valor do conteúdo do botão
  if (isNaN(inputResultado.value)) {
    inputResultado.value = event.target.textContent;
    // Senão, adiciona o valor aos demais
  } else {
    // Se o valor for zero, substitui o valor do visor pelo número clicado
    if (inputResultado.value == 0) {
      inputResultado.value = event.target.textContent;
      // Senão adiciona o número aos digitos no visor
    } else {
      inputResultado.value += event.target.textContent;
    }
  }
}

// Apaga Direita
function apagaDireita()
{
  inputResultado.value = inputResultado.value.substr(0, inputResultado.value.length - 1);
}

// Formata a saída
function formataResultado(num){
  let res = num.toString();
  let i = res.indexOf('.'); // procura a posição do ponto
  if(i < 0) { // se não tem ponto, não tem casas decimais
    return res;
  }else { // se tem ponto, quantidade de casas é o tamanho da string menos a posição posterior ao ponto
    let casasDecimais = res.length - i - 1;
    if (casasDecimais > 10){
      let resN = Number(res);
      return resN.toFixed(10);  
    } else{
      return res;
    }
  }
}

//Operação de soma
function somar(valor1, valor2) {
  return valor1 + valor2;
}

//Operação de subtração
function subtrair(valor1, valor2) {
  return valor1 - valor2;
}

//Operação de multiplicacao
function multiplicar(valor1, valor2) {
  return valor1 * valor2;
}

//Operação de divisão
function dividir(valor1, valor2) {
  if (valor2 === 0) {
    return "Erro, não é possível dividir um número por zero!";
  } else {
    return valor1 / valor2;
  }
}

//Operação de Quadrado
function quadradroF() {
  if (!isNaN(inputResultado.value) && calculo.funcaoParaCalcular == null) {
    let num = Number(inputResultado.value);
    let resultado = num * num;    
    inputResultado.value = resultado;
    calculo.valorSalvo = resultado;
  }
}

//Operação de Raiz Quadrada
function raizQF() {
  if (!isNaN(inputResultado.value) && calculo.funcaoParaCalcular == null) {
    let num = Number(inputResultado.value);
    let resultado = Math.sqrt(num);
    resultado = formataResultado(resultado);
    inputResultado.value = resultado;
    calculo.valorSalvo = resultado;
  }
}

//Operação Divide por X
function divideX() {
  if (!isNaN(inputResultado.value) && calculo.funcaoParaCalcular == null) {
    let num = Number(inputResultado.value);
    let resultado = 1 / num;
    resultado = formataResultado(resultado);
    inputResultado.value = resultado;
    calculo.valorSalvo = resultado;
  }
}

// Limpa o visor e os dados do cálculo
function limparDados() {
  inputResultado.value = "0";
  calculo.valorSalvo = null;
  calculo.funcaoParaCalcular = null;
}

function limparInput() {
    inputResultado.value = "0";
}

function inverteSinal() {
    let conteudoVisor = inputResultado.value;
    if(conteudoVisor[0] === "-"){
       conteudoVisor = conteudoVisor.substr(1,conteudoVisor.length-1);
    }else{
        conteudoVisor = "-"+inputResultado.value;
    }
    inputResultado.value = conteudoVisor;
}

// Insere o ponto para casas decimais
function inserirPonto() {
  if (inputResultado.value === "" || isNaN(inputResultado.value)) {
    inputResultado.value = "0.";
  } else if (!inputResultado.value.includes(".")) {
    inputResultado.value = inputResultado.value + ".";
  }
}

//Atribui a função de acordo com o tipo de operador clicado
function atribuirOperacao(operador) {
  if (operador === "+") {
    calculo.funcaoParaCalcular = somar;
  } else if (operador === "-") {
    calculo.funcaoParaCalcular = subtrair;
  } else if (operador === "x") {
    calculo.funcaoParaCalcular = multiplicar;
  } else {
    calculo.funcaoParaCalcular = dividir;
  }
}

//Atualiza valores de cálculo
function clicarOperador() {    
    if (event.target.textContent === '%'){
        inputResultado.value = Number(inputResultado.value)/100;;    
    } else{
        if (!isNaN(inputResultado.value)) {
            // Se não tiver um número salvo
            if (calculo.valorSalvo == null) {
            calculo.valorSalvo = Number(inputResultado.value);
            // Senão verifica se funcaoParaCalcular não esta vazia
            } else if (calculo.funcaoParaCalcular != null) {
                calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo,Number(inputResultado.value));
            }
        }
    let operador = event.target.textContent;
    atribuirOperacao(operador);
    inputResultado.value = operador;
    }
}



//Exibe resultado no visor
function clicarResultado() {
  if (!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null) {
    let resultado = calculo.funcaoParaCalcular(
      calculo.valorSalvo,
      Number(inputResultado.value)       
    );
    resultado = formataResultado(resultado);
    inputResultado.value = resultado;
    calculo.valorSalvo = resultado;
    calculo.funcaoParaCalcular = null;
  }
  
}
