class AsyncMutex {
  constructor() {
    this.queue = [];
    this.isLocked = false;
  }

  async acquire() {
    return new Promise((resolve) => {
      if (!this.isLocked) {
        this.isLocked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      resolve();
    } else {
      this.isLocked = false;
    }
  }
}

const mutex = new AsyncMutex();
const buffer = [];
const MAX_BUFFER_SIZE = 5;
let cycleCount = 0;

function displayBuffer() {
  const bufferItems = document.getElementById("buffer-items");
  bufferItems.innerHTML = "";

  for (const item of buffer) {
    const li = document.createElement("li");
    li.textContent = item;
    bufferItems.appendChild(li);
  }
}

function displayResult(result) {
  const resultBox = document.getElementById("result-items");
  const li = document.createElement("li");
  li.textContent = result;
  resultBox.appendChild(li);
}

async function producer() {
  while (cycleCount < 10) {
    await mutex.acquire();

    if (buffer.length < MAX_BUFFER_SIZE) {
      const item = Math.floor(Math.random() * 100); // Generate a random item
      buffer.push(item);
      console.log(`Produced item: ${item}`);
      displayResult(`Produced item: ${item}`);
      displayBuffer();
    }

    mutex.release();

    // Wait for some time before producing the next item
    await sleep(Math.random() * 1000);

    cycleCount++;
  }
}

async function consumer() {
  while (cycleCount < 10) {
    await mutex.acquire();

    if (buffer.length > 0) {
      const item = buffer.shift();
      console.log(`Consumed item: ${item}`);
      displayResult(`Consumed item: ${item}`);
      displayBuffer();
    }

    mutex.release();

    // Wait for some time before consuming the next item
    await sleep(Math.random() * 1000);

    cycleCount++;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

producer();
consumer();