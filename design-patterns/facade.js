/**
 * Facade Pattern
 *  -> Hiding underlying complexity
 *  https://en.wikipedia.org/wiki/Look-and-say_sequence
 */
class LookAndSaySequence {
 constructor (){
    this.steps = ['1'];
 }

 generate(steps) {
    while(steps--) {
        let currentStep = String(this.steps[this.steps.length - 1]).match(/(.)\1*/g);
        this.steps.push(currentStep.reduce((acc, str) => {
            return `${acc}${str.length}${str[0]}`;
        }, ''))
    }

    return this.steps;
 }

}

const data = new LookAndSaySequence();

console.log(data.generate(18))





