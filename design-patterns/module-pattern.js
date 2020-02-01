/**
 * Module pattern helps keeping the code organized
 */

 /**
  * Object literals 
  * @todo Dig into object construction
  * @todo dig into deep diferences between functions and arrow functions
  */

  // Defining an object will create a context that we can use.
  const literalObj = {
    config: { name: 'Object' },
    sayName: function () { console.log(this.config.name) },
    
    // Context is available only after construction
    // usiing arrow functions wont work as context is binded to the function
    emptyContext: () => console.log(this),
    fullContext: function() { console.log(this)},
  }

  // Executing methods
  literalObj.sayName();

  // Context functions
  literalObj.emptyContext();
  literalObj.fullContext();