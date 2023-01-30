# Projeto-2---BD2
Segundo projeto da disciplina Banco de Dados 2.


comando para criar index
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