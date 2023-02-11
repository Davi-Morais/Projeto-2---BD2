# Projeto-2---BD2
Segundo projeto da disciplina Banco de Dados 2.


## Como usar essa aplicacao:

1- Instale todos os pacotes necessários para que a aplicação funcione:
```
npm i
```
2- Crie um arquivo .env na raiz do repositório e coloque a url para seu banco do mongo:
```
MONGO_URL =
```


3- comando para criar index no banco mongo
```
db.notas.createIndex(
   {
     titulo: "text",
     conteudo: "text"
   },
   {
     weights: {
       titulo: 2,
       conteudo: 1
     },
     name: "TextIndex"
   }
 )
 ```
