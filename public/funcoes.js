const buscarTudo = async () => {

    fetch('http://localhost:3000/all',{
        method: 'GET',})
    
    .then((res)=> res.json())
    console.log(all);
    
}

module.exports = buscarTudo;