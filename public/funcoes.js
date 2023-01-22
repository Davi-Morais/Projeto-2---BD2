async function pegar_todas_anotacoes(){
    let url = "http://localhost:3000/all"

    fetch('http://localhost:3000/all',{
        method: 'GET',})
    
    .then((res)=> res.json())
    console.log(all);
    
}


async function carregar_todas_as_anotacoes() {
    const res = await pegar_todas_anotacoes();

    const div_conteiner = document.getElementById('all_anotacoes');

    //for usado para imprimir as anotacoes na tela:
    res.forEach(element => {
       const titulo = element.titulo;
       const conteudo = element.conteudo;

       const div_anotacoes = document.createElement("div");
       div_anotacoes.className = 'anotacao';
       div_anotacoes.innerHTML += `<h3>${titulo}</h3><p>${conteudo}</p>`; 

       div_conteiner.appendChild(div_anotacoes);
    });
}

carregar_todas_as_anotacoes();