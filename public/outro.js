const sampleForm = document.getElementById("enviar-anotacao");

sampleForm.addEventListener("submit", async (e) => {
  
  e.preventDefault();

  let form = e.currentTarget;

  let url = form.action;

  try {
    let formData = new FormData(form);

    let responseData = await postFormFieldsAsJson({ url, formData });

    let { serverDataResponse } = responseData;

    console.log(serverDataResponse);
    document.location.reload(true);
  } catch (error) {
    console.error(error);
  }
});

async function postFormFieldsAsJson({ url, formData }) {
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataJsonString = JSON.stringify(formDataObject);

  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  let res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  
  return res.json();
}



//form de pesquisa
const pesquisaForm = document.getElementById("pesquisa_form");

pesquisaForm.addEventListener('submit', async (e) => {

  e.preventDefault();
  const form = e.currentTarget;
  let url = form.action;

  const barraPesquisa = document.getElementsByName("buscar");
  const valor = barraPesquisa[0].value;

  const resposta = await fetch(url + valor).then(res=> res.json()).catch((res)=> {return null} );
  
  if(!resposta){
    const div_conteiner = document.getElementById('all_anotacoes');
    div_conteiner.innerHTML = `<p>Nada encontrado...</p>`;
  } else {
    const div_conteiner = document.getElementById('all_anotacoes');
    div_conteiner.innerHTML = ` `;

    resposta.forEach(element => {
      console.log(element);
        const titulo = element.titulo;
        const conteudo = element.conteudo;
  
        const div_anotacoes = document.createElement("div");
        div_anotacoes.className = 'anotacao';
        div_anotacoes.innerHTML += `<h3>${titulo}</h3><p>${conteudo}</p>`; 
  
        div_conteiner.appendChild(div_anotacoes);
    });
  };
});


