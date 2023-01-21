const buscar = require('./funcoes');

function load () {
    const elementos = buscar.buscarTudo();

    elementos.forEach(element => {
        document.body.appendChild('<div>element<div/>');
    });
}