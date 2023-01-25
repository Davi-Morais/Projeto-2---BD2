async function pegar_todas_anotacoes(){
    let url = "http://localhost:3000/all"

    return fetch('http://localhost:3000/all',{
        method: 'GET',})
    
    .then((res)=> res.json())
}

const btnListar = document.getElementById('listar');

btnListar.addEventListener('click', async function carregar_todas_as_anotacoes(){
    const res = await pegar_todas_anotacoes();
    console.log(res);
    const div_conteiner = document.getElementById('all_anotacoes');
        
        //for usado para imprimir as anotacoes na tela:
        res.forEach(element => {
        const titulo = element.titulo;
        const conteudo = element.conteudo;

        const div_anotacoes = document.createElement("div");
        div_anotacoes.className = 'anotacao';
        div_anotacoes.innerHTML += `<h3>${titulo}</h3><p>${conteudo}</p> <a href="#"> <button class= "btn btn-sucess" id = "btnEdit">Editar Postagem</button></a> `; 

        div_conteiner.appendChild(div_anotacoes);
    });
});

//Nova funcionalidade

const btnEdit = document.getElementById('btnEdit')
btnEdit.addEventListener('click', async function editar_postagens(){
        carregar_todas_as_anotacoes();
        const div_conteiner = document.getElementById('all_anotacoes');
        const div_teste = document.createElement("div");
        div_teste.innerHTML += `<h1> Funcionou</h1>`
        div_conteiner.appendChild(div_teste);
    }
)

