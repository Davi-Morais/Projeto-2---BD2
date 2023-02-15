const neo4j = require('neo4j-driver');
const dotenv = require("dotenv")

dotenv.config()

const driver = neo4j.driver(process.env.URI, neo4j.auth.basic(process.env.USER, process.env.PASSWORD));


// driver.session()
//   .run('MATCH (n) RETURN count(n)')
//   .then(result => {
//     console.log(`Connected to Neo4j database. Found ${result.records[0].get(0)} nodes.`);
//   })
//   .catch(error => {
//     console.error('Error connecting to Neo4j database:', error);
//   });
  const sessionAura = driver.session();  

module.exports = { sessionAura };



