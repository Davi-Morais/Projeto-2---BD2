const {driver} = require('../db/Neo4jDatabase');

async function createRelationship(req,res){

  const userId = req.params.idUser;
  const noteId = req.params.noteId;

  console.log("Creating relationship between user", userId, "and note", noteId);

  const session = driver.session();

  try {
      const result = await session.run(
          `MERGE (u:Usuario {id: $userId})
           MERGE (n:Anotacao {id: $noteId})
           MERGE (u)-[r:POSSUI]->(n)
           RETURN r`,
          { userId, noteId }
      );

      return result.records[0].get("r");
  } catch (error) {
      console.error(error);
      throw error;
  } finally {
      session.close();
      res.send("ok");
  }
}

// async function createNodes(req,res){

//   const userId = req.params.idUser;
//   const noteId = req.params.noteId;

//   console.log("Creating nodes for user", userId, "and note", noteId);

//   const session = driver.session();

//   try {
//       const result = await session.run(
//           `CREATE (u:Usuario {id: $userId})
//            CREATE (n:Anotacao {id: $noteId})
//            RETURN u, n`,
//           { userId, noteId }
//       );

//       console.log("Nodes created:", result.records);

//       return result.records;
//   } catch (error) {
//       console.error(error);
//       throw error;
//   } finally {
//     createRelationship()
//       session.close();
//   }
// }










module.exports = {createRelationship};