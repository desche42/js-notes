/**
 * Mediator patters decouples components from each other.
 * Specifically useful when there are lots of components
 */

 /**
  * Lets do some Air Traffic Control
  */

/**
 * Provides for coordinates and id
 */
function getRandomCoords (mapSize, allowNegative = false) {
    return {
      X: getRandomInt(mapSize, allowNegative),
      Y: getRandomInt(mapSize, allowNegative),
      Z: getRandomInt(mapSize, allowNegative)
    };
  }

function getRandomInt (max, allowNegative) {
  let n = Math.floor(Math.random()*max);

  if (allowNegative) {
    n *= (Math.round(Math.random()) * 2 - 1);
  }

  return n;
}

/**
 * This will be our mediator, the air traffic controller
 */
class AirTrafficController {
  constructor(nPlanes) {
    this.size = 5000;
    this.dangerZoneSize = 5;
    this.time = 2;
    this.planes = [];

    while(this.planes.length < nPlanes) {
      this.planes.push(new Plane(this.size, this.planes.length));
    }
  }

  start() {
    while(this.time--) {
      console.log(this.time);
      this._updatePositions();
      this._calculateDistances();
    }
  }

  _updatePositions() {
    this.planes.forEach(plane => plane.updatePosition());
  }

  _calculateDistances() {
    
  }
}

class Plane {
  constructor (mapSize, id) {
    this.coords = getRandomCoords(mapSize);
    this.direction = getRandomCoords(mapSize, true)
    this.id = `P${id}`;
  }

  updatePosition() {
    for (let coord in this.coords) {
      this.coords[coord] += this.direction[coord];
    }
  }
}

const ATC = new AirTrafficController(5);

ATC.start();
