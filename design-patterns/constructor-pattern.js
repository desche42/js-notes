/**
 * Constructors pattern
 */

 // With ES6 we can define classes

 class Plane {
     // properties are asigned to class instances
     constructor (model) {
        this.model = model;
     }

     getModel () {
         return `My model is ${this.model}`;
     }


 }

 // Separate contexts
 const airbus = new Plane('Max 777');
 const bae = new Plane('Concorde');

 bae.model = 'CONCORDE';

 console.log(airbus.getModel());
 console.log(bae.getModel());