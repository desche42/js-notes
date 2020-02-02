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
    this.margins = 200;
    this.dangerZoneSize = 5;
    this.maxIterations = 120000;
    this.iteration = 1;
    this.planes = [];

    // logs
    this.logNIterations = 1000;
    this.logs = {};

    console.log(`Adding  ${nPlanes} planes`);
    while(this.planes.length < nPlanes) {
      const newPlane = new Plane(this.size, this.planes.length);
      this.planes.push(newPlane);
    }
  }

  start() {
    console.log('Simulation started');
    this.logs.startTime = +new Date();

    while(this.iteration && this.iteration < this.maxIterations) {
      this._updatePositions();
      const crash = this._checkCrash();
      
      if (!crash) {
        this.planes.forEach(plane => this._checkDirection(plane));
        this.iteration++;
      } else {
        this._addLogs();
        console.log(`There was a crash in iteration ${this.iteration}`);
        this.iteration = false;
      } 
    }
    
    console.log('Simulation finished');

    return {[this.planes.length]: { [this.logs.startTime]: this.logs } };
  }

  _checkCrash() {
    const distancesMap = this._getRelativeDistances(this.planes);

    
    const minDistance = Object.values(distancesMap)
      .map(d => Math.min(Object.values(d)))
      .filter(Boolean).pop();
    
    return minDistance < this.margins;
  }

  _updatePositions() {
    this.planes.forEach(plane => {
      plane.updatePosition();
    });
  }

  /**
   * Checks direction to stay 
   */
  _checkDirection(plane) {
    Object.keys(plane.coords).forEach(coord => {
      const position = plane.coords[coord];

      const isPlaneGoigTooDown = position < this.margins && plane.direction[coord] < 0;
      const isPlaneGoingTooUp = position > this.size - this.margins && plane.direction[coord] > 0;

      if (isPlaneGoigTooDown) {
        // console.log(`ATC to ${plane.id}, change +${coord} direction`);
        plane.updateDirection(coord, 30);
      } else if (isPlaneGoingTooUp) {
        // console.log(`ATC to ${plane.id}, change -${coord} direction`);
        plane.updateDirection(coord, -30);
      }
    });
  }

  /**
   * https://en.wikipedia.org/wiki/Combination
   * 
   * x 12 13 14
   *    x 23 24
   *       x 34
   *          x
   */
  _getRelativeDistances(planes, distances = {}) {
    const [currentPlane, ...restOfPlanes] = planes;
    
    if (!restOfPlanes.length) {
      return distances;
    }

    return restOfPlanes.reduce((acc, nextPlane) => {
      let distance = this._calculateDistance(currentPlane.coords, nextPlane.coords);
      acc[currentPlane.id] = Object.assign({}, acc[currentPlane.id], {[nextPlane.id]: distance})
      return this._getRelativeDistances(restOfPlanes, acc);
    }, distances);
  }

  /**
   * Euclidian distance calculation
   * https://en.wikipedia.org/wiki/Euclidean_distance
   */
  _calculateDistance(a, b) {
    return Math.round(Math.sqrt(
      Object.keys(a).reduce((sum, coord) => {
        return sum + Math.pow(a[coord] - b[coord], 2);
    }, 0)));
  }

  /**
   * Adds logs
   */
  _addLogs() {
    const now = +new Date();
    const aborted = this.iteration >= this.maxIterations;
    
    const log = {
      endTime: now,
      totalTime: now - this.logs.startTime,
      iterations: this.iteration,
      mapSize: this.size,
      margins: this.margins,
      dangerZoneSize: this.dangerZoneSize,
      planes: this.planes.length,
      ...(aborted && {aborted})
    };
    log.avgSpeed = Math.round(this.iteration*1000/log.totalTime);

    Object.assign(this.logs, log);
  }
}



/**
 * Plane 
 */
class Plane {
  constructor (mapSize, id) {
    //maybe not need to initialize coords
    this.coords = getRandomCoords(mapSize);
    this.direction = getRandomCoords(mapSize/8, true)
    this.id = `P${id}`;
  }

  updatePosition() {
    for (let coord in this.coords) {
      this.coords[coord] += this.direction[coord];
    }
  }

  updateDirection(coord, amount) {
    this.direction[coord] += amount;
  }
}

// log preparation
const fs = require('fs');
const path = require('path');
const LOGS_PATH = path.join(__dirname,'mediator-atc-logs.json');
const logs = {};
if (fs.existsSync(LOGS_PATH)) {
  Object.assign(logs, JSON.parse(fs.readFileSync(LOGS_PATH)));
}

// do simulations
const N_PLANES = [3,4,5,6,7,8];
N_PLANES.map(nPlanes => {
  const ATC = new AirTrafficController(nPlanes);
  const results = ATC.start();
  // ensure destination exists
  logs[nPlanes] = logs[nPlanes] || {};
  // assign new data
  Object.assign(logs[nPlanes], results[nPlanes]);
  fs.writeFileSync(LOGS_PATH, JSON.stringify(logs, null, 2));
}, {});


