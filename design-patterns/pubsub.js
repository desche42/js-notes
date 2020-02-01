/**
 * pub/sub pattern, similar to observer
 */
class PubSubPattern {
	constructor () {
        this.topics = {};
    }
    
    /**
     * Token generator for identifying subscribers
     */
    _getToken(topic) {
        const token = Math.floor(Math.random()*10000000);
        return this.topics[topic][token] ? this._getToken(topic) : token;
    }

    /**
     * Ensures that a given topic exists
     * @param {String} topic name
     */
    _ensureTopic(topic) {
        !this.topics[topic] && Object.assign(this.topics, {[topic]: {}});
    }

    /**
     * Add a subscriber
     * @param {Function} subscriber callback
     * @returns token
     */
    on(topic, subscriber) {
        this._ensureTopic(topic);
        const token = this._getToken(topic);
        this.topics[topic][token] = subscriber;
        return token;
    }

    /**
     * Removes a subscriber from the topic
     * Deletes topic if not subscribers
     * @param {String} token of the subscriber
     */
    off(topic, token) {
        const topicSubs = this.topics[topic] || {};

        if (topicSubs[token]) {
            delete topicSubs[token];
        }

        if(!Object.keys(topicSubs).length) {
            delete this.topics[topic];
        }
    }

    /**
     * Emits a message to all topic subscribers
     */
    emit(topic, message) {
        const subscribers = this.topics[topic];

        if (!subscribers) {
            console.log(`Topic ${topic} doesn't exist`);
        } else {
            console.log(`Topic ${topic} has ${Object.keys(subscribers).length} subscribers`);
            for (let id in subscribers) {
                subscribers[id](message);
            }
        }
    }
}

const stocks = new PubSubPattern();

const bbva = stocks.on('BBVA', price => console.log(`BBVA is at ${price} €`));
const bbva2 = stocks.on('BBVA', price => console.log(`BBVA is at ${price} €`));

stocks.emit('BBVA', '6,33'); // received by 2 subscribers

stocks.off('BBVA', bbva);

stocks.emit('BBVA', '6,34'); // received by 1 subscriber
stocks.off('BBVA', bbva2);

stocks.emit('BBVA', '6,38'); // channel not exists
