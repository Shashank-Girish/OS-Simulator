class IndexNode {
  constructor(blockNumber) {
    this.blockNumber = blockNumber;
    this.next = null;
  }
}

class FileNode {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.index = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(diskSize) {
    this.head = null;
    this.diskSize = diskSize;
    this.usedSpace = 0;
  }

  insertFile(name, size) {
    if (this.usedSpace + size > this.diskSize) {
      console.log(`Insufficient disk space to insert file '${name}'.`);
      return;
    }

    const numBlocks = Math.ceil(size / 4); // Each block has a size of 4 units

    const indexList = new LinkedList(numBlocks);
    for (let i = 0; i < numBlocks; i++) {
      indexList.insertIndex(i);
    }

    const newNode = new FileNode(name, size);
    newNode.index = indexList;

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }

    this.usedSpace += size;
    console.log(`Inserted file '${name}' with size ${size}.`);
  }

  insertIndex(blockNumber) {
    const newNode = new IndexNode(blockNumber);

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  allocateFile(name, size) {
    if (this.usedSpace + size > this.diskSize) {
      console.log(`Insufficient disk space to allocate file '${name}'.`);
      return;
    }

    const numBlocks = Math.ceil(size / 4); // Each block has a size of 4 units

    const indexList = new LinkedList(numBlocks);
    for (let i = 0; i < numBlocks; i++) {
      indexList.insertIndex(i);
    }

    const newNode = new FileNode(name, size);
    newNode.index = indexList;

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }

    this.usedSpace += size;
    console.log(`Allocated file '${name}' with size ${size}.`);
  }

  
  displayFiles() {
    const fileStructureDiv = document.getElementById("file-structure");
    fileStructureDiv.innerHTML = ""; // Clear the previous file structure

    let currentNode = this.head;
    while (currentNode) {
      const fileDiv = document.createElement("div");
      fileDiv.textContent = `File: ${currentNode.name}, Size: ${currentNode.size}`;
      fileDiv.classList.add("file");

      const indexBlocksDiv = document.createElement("div");
      indexBlocksDiv.textContent = "Index Blocks:";
      indexBlocksDiv.classList.add("index-blocks");

      let indexNode = currentNode.index.head;
      while (indexNode) {
        const blockNumberDiv = document.createElement("div");
        blockNumberDiv.textContent = `Block Number: ${indexNode.blockNumber}`;
        blockNumberDiv.classList.add("block-number");

        indexBlocksDiv.appendChild(blockNumberDiv);
        indexNode = indexNode.next;
      }

      fileDiv.appendChild(indexBlocksDiv);
      fileStructureDiv.appendChild(fileDiv);

      currentNode = currentNode.next;
    }
    }
}

// Function to handle form submission
function insertFile() {
  const fileNameInput = document.getElementById("file-name");
  const fileSizeInput = document.getElementById("file-size");

  const fileName = fileNameInput.value;
  const fileSize = parseInt(fileSizeInput.value);

  fileList.insertFile(fileName, fileSize);

  fileNameInput.value = "";
  fileSizeInput.value = "";
}

// Function to handle form submission
function allocateFile() {
  const fileNameInput = document.getElementById("file-name");
  const fileSizeInput = document.getElementById("file-size");

  const fileName = fileNameInput.value;
  const fileSize = parseInt(fileSizeInput.value);

  fileList.allocateFile(fileName, fileSize);

  fileNameInput.value = "";
  fileSizeInput.value = "";
}

// Display the file structure
function displayFiles() {
  fileList.displayFiles();
}

