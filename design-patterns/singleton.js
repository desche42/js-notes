/**
 * Restricts instantiation of a class to a single object.
 * Provide a shared namespace
 */

/**
 * Module pattern
 */
function counter () {
    let _privateCounter = 0;

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
}


const Singleton = (function () {
    let instance;

    function getInstance() {
        return instance || _init();
    }

    function _init(){
        instance = counter();
        return instance;
    } 

    return {getInstance};
})();

// rellay only one instance
const firstInstance = Singleton.getInstance();
const secondInstance = Singleton.getInstance();

firstInstance.incrementCounter();
secondInstance.incrementCounter();
firstInstance.incrementCounter();
secondInstance.incrementCounter();
firstInstance.incrementCounter();
secondInstance.incrementCounter();

