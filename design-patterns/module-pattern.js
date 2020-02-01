/**
 * Module pattern helps keeping the code organized
 * Its the emulation of classes, avoiding global changes and keep everything isolated
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



/**
 * Module pattern
 */

 /**
  * Extends literal objects -> privacy
  * IIFE
  */
 const iife = (() => {
    let _privateCounter = 0;

    // private method identified with beggining underscore as a convention
    const _incrementCounter = () => _privateCounter++;
    const _speakCounter = () => console.log('Counter is at', _privateCounter);
    
    // public method
    function incrementCounter () {
        _incrementCounter();
        _speakCounter();
    };
    
    return {
        incrementCounter
    }

 })();

 console.log('Cannot access private variable _privateCounter', iife._privateCounter);

 console.log('But can change it public methods');
 iife.incrementCounter()

 
 /**
  * Disadvantages
  * - Cannot test private methods
  */
 



