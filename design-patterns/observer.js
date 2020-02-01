/**
 * Observer pattern
 */

class Name {
	constructor (name) {
		this.name = name;
	}
 }

 /**
  * The subject holds the observers
  */
 class Subject extends Name {
	constructor (name, observers) {
		super(name);
		this.observers = new Set(observers);
	}

	addObserver (observer) {
		this.observers.add(observer);
	}

	removeObserver(observer) {
		this.observers.delete(observer);
	}

	notify(change) {
		console.log(`\n${this.name} updated state to ${change}`);
		this.observers.forEach(observer => {
			observer.update(change);
		});
	}
 }

 /**
  * Observer receives the changes
  */
 class Observer extends Name {
	constructor (name) { 
		super(name);
		this.status = '';
	};

	update(change) {
		this.status = change;
		console.log(`${this.name} received new status`)	
	 }
 }

/**
 * Getting to it
 */

// this will be the observers
const walter = new Observer('Walter');
const peter = new Observer('Peter');
const september = new Observer('September');

// and this the subject
const timeLine = new Subject('Time Line', [walter, peter, september]);

timeLine.notify('change in the probabilities');

timeLine.removeObserver(walter);

timeLine.notify('function colapse at measurement');


// similar to pub/sub
// the difference is that pub/sub pattern changes are notified by topic
// whereas in observer pattern the subject knows who is sending the update

