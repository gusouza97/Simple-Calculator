;(function readyJS(win, doc) {
    'use strict'

    /*
    ID botoes
    0 -> 0
    1 -> 1
    2 -> 2
    3 -> 3
    4 -> 4
    5 -> 5
    6 -> 6
    7 -> 7
    8 -> 8
    9 -> 9
    10 -> /
    11 -> X
    12 -> -
    13 -> +
    14 -> =
    16 -> C
    17 -> .
    */

    // VARIABLES
    let btn = document.getElementsByTagName('button')
    let panelHistory = document.querySelector('.calcHistory')
    let panelValue = document.querySelector('.calcResult')
    let caracters = [];
    let textValue = '';
    let panelHistoryText = '';
    let resultado;
    let operator = null;
    let numberFloat = false;

    // LISTENERS
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e) => {
            checkClick(e)
        })
    }

    window.addEventListener("keydown", (e) => {
        console.log(e.key)
        checkKey(e.key);
    })

    // FUNCTIONS
    // Checagem do botao clicado
    const checkClick = (e) => {
        // Verificando se é um número
        if (e.target.id >= 0 && e.target.id <= 9) {
            if(textValue.length < 18){
                checkNumber(e.target.id)
            }
        }

        // Verificando se é um Operador
        if (e.target.id >= 10 && e.target.id <= 15) {
            checkOperator(e.target.textContent)
        }

        // Verificando se é o Apagar
        if (e.target.id == 16) {
            deleteData()
        }

        // Verificando se é o Ponto Flutuante
        if (e.target.id == 17) {
            if(numberFloat == false){
                numberFloat = true;
                AtualizaPanelValue(e.target.textContent)
            }
        }
    }

    // Funcao Number
    const checkNumber = (value) => {

        if (value >= 0 && value <= 9) {
            if(textValue.length < 18){
                if(resultado == true){
                    panelValue.textContent = ''
                    textValue = ''
                    resultado = false;
                }
                AtualizaPanelValue(value)
            }
        }
    }

    // Funcao que monitora o teclado
    const checkKey = (value) => {
        if(parseInt(value) >= 0 && parseInt(value) <= 9){
            checkNumber(value);
        }

        if(value == "."){
            if(numberFloat == false){
                numberFloat = true;
                AtualizaPanelValue(e.target.textContent)
            }
        }

        if(value == "+" || value == "/" || value == "*" || value == "-" || value == "=" || value == "Enter"){
            checkOperator(value);
        }

    }

    // Função que atualiza painel history
    const AtualizaPanelHistory = () => {
        caracters.push(parseFloat(textValue))

        if (operator != '=') {
            caracters.push(operator)
        }

        panelHistoryText = '' + panelHistoryText + textValue + operator
        panelHistory.textContent = panelHistoryText
    }

    // Função que atualiza painel value
    const AtualizaPanelValue = (value) => {
        textValue = textValue + value.toString()
        panelValue.textContent = textValue
    }

    // Função verifica operador atribuido
    const checkOperator = (value) => {
        if (textValue != '') {
            // Verificando se é Soma
            if (value == '+') {
                operator = '+'
            }
            if (value == '-') {
                operator = '-'
            }
            if (value == 'X') {
                operator = 'x'
            }
            if (value == '/') {
                operator = '÷'
            }

            if (value == '=' || value == 'Enter') {
                operator = '='
                AtualizaPanelHistory()
                CalcResultado(textValue)
                return
            }

            AtualizaPanelHistory()
            panelValue.textContent = ''
            textValue = ''
            numberFloat = false
        }
    }

    // Funçao de Apagar Dados
    const deleteData = () => {
        panelHistoryText = ''
        panelHistory.textContent = ''
        panelValue.textContent = ''
        textValue = ''
        numberFloat = false
        caracters = []
    }

    // Funçao Calcular Resultado
    const CalcResultado = () => {
        for (let i = 0; i < caracters.length; i++) {
            if (
                caracters[i] == 'x' &&
                caracters[i - 1] != 'NA' &&
                caracters[i + 1] != 'NA'
            ) {
                caracters[i + 1] = caracters[i - 1] * caracters[i + 1]
                caracters[i] = 'NA'
                caracters[i - 1] = 'NA'
            }

            if (
                caracters[i] == '÷' &&
                caracters[i - 1] != 'NA' &&
                caracters[i + 1] != 'NA'
            ) {
                caracters[i + 1] = caracters[i - 1] / caracters[i + 1]
                caracters[i] = 'NA'
                caracters[i - 1] = 'NA'
            }
        }

        for (let i = 0; i < caracters.length; i++) {
            caracters = caracters.filter((value) => {
                return value != 'NA'
            })
        }

        for (let i = 0; i < caracters.length; i++) {
            if (
                caracters[i] == '+' &&
                caracters[i - 1] != 'NA' &&
                caracters[i + 1] != 'NA'
            ) {
                caracters[i + 1] = caracters[i - 1] + caracters[i + 1]
                caracters[i - 1] = 'NA'
                caracters[i] = 'NA'
            }
            if (
                caracters[i] == '-' &&
                caracters[i - 1] != 'NA' &&
                caracters[i + 1] != 'NA'
            ) {
                caracters[i + 1] = caracters[i - 1] - caracters[i + 1]
                caracters[i - 1] = 'NA'
                caracters[i] = 'NA'
            }
        }

        for (let i = 0; i < caracters.length; i++) {
            caracters = caracters.filter((value) => {
                return value != 'NA'
            })
        }

        panelValue.textContent = caracters.toString()
        textValue = caracters.toString()
        caracters = []
        panelHistoryText = ''
        panelHistory.textContent = ''
        resultado = true
    }
})(window, document)
