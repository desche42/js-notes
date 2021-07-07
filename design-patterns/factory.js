/**
 * Factory Pattern
 * 
 * Interface for generating objects
 */

 function golosina() {
     this.sabor = 'dulce';
    }
    
function ballena(options) {
    this.sabor = options.sabor || 'dulce';
    this.color = options.color || 'blanco y negro';
}

function lengua(options) {
    this.color = options.color || 'rojo';
    this.sabor = options.sabor || 'dulce recubierto de ácido';
}

function FabricaGolosinas() {}

FabricaGolosinas.prototype.dameDulce = function(tipo, opciones = {}) {
    switch (tipo) {
        case 'lengua':
            this.golosina = lengua;
            break;
        case 'ballena':
            this.golosina = ballena;
            break;
        default:
            this.golosina = golosina;
            break;
    }

    return new this.golosina(opciones);
}


const fabrica = new FabricaGolosinas();

console.log('Quiero una ballena.\n Aquí tienes una', fabrica.dameDulce('ballena'));
console.log('Quiero una lengua.\n Aquí tienes una', fabrica.dameDulce('lengua'));
console.log('Quiero la que sea.\n Aquí tienes una', fabrica.dameDulce());


