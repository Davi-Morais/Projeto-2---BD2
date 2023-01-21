const buscarTudo = async () => {

    const all = await fetch('http://localhost:3000/all').then((res)=> res.json());
    
    return all;
}

module.exports = buscarTudo;