const {driver} = require('../db/Neo4jDatabase');


async function createRelationship(req,res){

    const userId = req.params.idUser;
    const noteId = req.params.noteId;

    console.log("ojndaionoisdnoindoianodsnoiadohiu389h7hd9828j89208jd89dj90////////////////////////////")
    console.log(userId,noteId)

  const session = driver.session();
    

  return session.run(
    `MATCH (u:Usuario), (n:Anotacao)
     WHERE u.id = $userId AND n.id = $noteId
     CREATE (u)-[r:POSSUI]->(n)
     RETURN r`,
    { userId, noteId }
  )
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.error(error);
      throw error;
    })
    .finally(() => {
      session.close();
    });
}

module.exports = {createRelationship};