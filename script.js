const corpo = document.getElementById('corpo')
const mensagem = document.getElementById('mensagem')
const quilometragemAtual = document.getElementById('quilometros')
const colunaDois = document.getElementById('coluna2')
const app =document.getElementById('app')
const litros = document.getElementById('litros')
const valor = document.getElementById('valor')
const data = document.getElementById('data')
var criado = false
var quilometragem = []
let contagem = localStorage.getItem('contagem')

function verificarCaixas(){
    if(quilometragemAtual.value.length == 0 || litros.value.length == 0 ||
         valor.value.length == 0 || data.value.length == 0 ){
        alert("[ERRO] Preencha todos os campos")
    }else{
        return true
    }
}

function salvar(){
    
    if (verificarCaixas() === true){
        if(localStorage.length == 0){
            contagem = localStorage.setItem('contagem' , '0')
        }
                
        contagem = localStorage.getItem('contagem')
        localStorage.setItem(`litrosAbastecidos${contagem}`, `${litros.value}`)
        localStorage.setItem(`quilometragemTotal${contagem}` , `${quilometragemAtual.value}`)
        localStorage.setItem(`custoTotal${contagem}`, `${valor.value}`)
        localStorage.setItem(`dataAbastecimento${contagem}`, `${data.value}`)

        
        aparecerValoresAtuais()

        contagem++
        contagem = localStorage.setItem('contagem' , `${contagem}`)

        //Este botão identifica se já foi criada a div valoresAtuais
        criado = true
    }
}

function aparecerValoresAtuais(){
    
    if(criado == false){
        valoresAtuais = document.createElement('div')
        valoresAtuais.style.display = 'initial'
        valoresAtuais.setAttribute('id' , 'valorAtual')
        informacoes = document.createElement('div')
        informacoes.setAttribute('id' , 'informacoes')
        aparecerBotaoVoltar(valoresAtuais)
        botaoVoltar = document.getElementById('voltar')
        aparecerBotaoHistorico(valoresAtuais)
        botaoHistorico = document.getElementById('Historico')
    }
    if(criado == true){
        valoresAtuais = document.getElementById('valorAtual')
        valoresAtuais.style.display = 'initial'
        informacoes = document.getElementById('informacoes')

    }

    var ultimaQuilometragem = localStorage.getItem(`quilometragemTotal${contagem - 1}`)
    var quilometragemRodada =  quilometragemAtual.value - ultimaQuilometragem
    var kmporlitro = quilometragemRodada / litros.value
    var precoLitro = valor.value / litros.value
    var preco = precoLitro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    colunaDois.style.display = 'none'

    app.appendChild(valoresAtuais)

    valoresAtuais.appendChild(informacoes)

    informacoes.innerHTML = `<h1>Memória</h1>`
    informacoes.innerHTML += `<p> Quilometragem atual : ${quilometragemAtual.value}Km</p>`
    informacoes.innerHTML += `<p> Você abasteceu : ${litros.value} litros </p>`
    informacoes.innerHTML += `<p> Você gastou :  R$${valor.value} </p>`
    informacoes.innerHTML += `<p> Data do abastecimento : ${data.value} </p>`
    informacoes.innerHTML += `<p> Média : ${kmporlitro.toFixed(2)} Km/L </p>`
    informacoes.innerHTML += `<p> Preço por litro : ${preco}`
    menuAtual = valoresAtuais
    
}

function aparecerBotaoVoltar(menu){
    
    botao = document.createElement('input')
    botao.setAttribute('type' , 'button')
    botao.setAttribute('value','Voltar')
    botao.setAttribute('onclick',`voltar()`)
    botao.setAttribute('id','voltar')

    menu.appendChild(botao)
    
}
function aparecerBotaoHistorico(menu){
    const botaoHistorico = document.createElement('input')
    botaoHistorico.setAttribute('type' , 'button')
    botaoHistorico.setAttribute('value','Historico')
    botaoHistorico.setAttribute('onclick',`aparecerHistorico()`)
    botaoHistorico.setAttribute('id','historico')
    menu.appendChild(botaoHistorico)
    
}
function voltar(){
    
    menuAtual.style.display='none'
    
    colunaDois.style.display = 'initial'

    quilometragemAtual.value = ''
    litros.value = ''
    valor.value=''
    data.value=''

}
function aparecerHistorico(){
    
    const valoresAtuais = document.getElementById('valorAtual')
    valoresAtuais.style.display='none'

    const historico = document.createElement('div')
    historico.setAttribute('id', 'historico')
    historico.style.display='initial'
    app.appendChild(historico)

    for(let i = 0; i< localStorage.length /5 ;i++){
        div = document.createElement('div')
        div.setAttribute('class', 'divHistorico')
        historico.appendChild(div)

        div.innerHTML += `Quilometragem ${localStorage.getItem(`quilometragemTotal${i}`)}Km <br>`
        div.innerHTML += `Litros Abastecidos ${localStorage.getItem(`litrosAbastecidos${i}`)}L <br>`
        div.innerHTML += `Data${localStorage.getItem(`dataAbastecimento${i}`)}<br>`
        div.innerHTML += `Custo Total R$ ${localStorage.getItem(`custoTotal${i}`)}`
    }
    aparecerBotaoVoltar(historico)
    menuAtual = historico
    
    
}
