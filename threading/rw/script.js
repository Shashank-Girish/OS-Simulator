// Semaphore implementation
class Semaphore {
  constructor(initialCount) {
    this.count = initialCount;
    this.waitingList = [];
  }

  async acquire() {
    if (this.count > 0) {
      this.count--;
    } else {
      await new Promise((resolve) => {
        this.waitingList.push(resolve);
      });
    }
  }

  release() {
    if (this.waitingList.length > 0) {
      const resolve = this.waitingList.shift();
      resolve();
    } else {
      this.count++;
    }
  }
}

// Mutex implementation
class Mutex {
  constructor() {
    this.semaphore = new Semaphore(1);
  }

  async lock() {
    await this.semaphore.acquire();
  }

  unlock() {
    this.semaphore.release();
  }
}

// Simulation
function startSimulation() {
  var readersCount = parseInt(document.getElementById('readers').value);
  var writersCount = parseInt(document.getElementById('writers').value);

  // Shared variable
  var sharedVariable = 0;

  // Semaphore and Mutex
  var resourceAccess = new Semaphore(1);
  var readCountAccess = new Mutex();

  // Output elements
  var output = document.getElementById('output');
  var logBox = document.getElementById('log');

  // Helper functions
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Helper function to generate a random delay between min and max milliseconds
  function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function writer() {
    await resourceAccess.acquire();
    var delay = getRandomDelay(1000, 3000);
    await sleep(delay);
    sharedVariable++;
    var log = `Writer: incremented shared variable to ${sharedVariable}\n`;
    logBox.textContent += log;
    resourceAccess.release();

  }

  async function reader() {
    await readCountAccess.lock();
    var delay = getRandomDelay(1000, 3000);
    await sleep(delay);
    var readCount = ++readersCount;
    if (readCount === 1) {
      await resourceAccess.acquire();
    }
    readCountAccess.unlock();

    var log = `Reader: read shared variable ${sharedVariable}\n`;
    logBox.textContent += log;

    await readCountAccess.lock();
    readersCount--;
    if (readersCount === 0) {
      resourceAccess.release();
    }
    readCountAccess.unlock();

  }

  async function simulate() {
    var tasks = [];

    // Create writer tasks
    for (var i = 0; i < writersCount; i++) {
      tasks.push(writer());
    }

    // Create reader tasks
    for (var i = 0; i < readersCount; i++) {
      tasks.push(reader());
    }

    // Run tasks concurrently
    await Promise.all(tasks);

    // Display output
    output.innerHTML = `Simulation completed. Final shared variable value: ${sharedVariable}`;
  }

  simulate();
}
