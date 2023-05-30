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
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = `Insufficient disk space to allocate file '${name}'.`;
      errorMessage.style.display = "block";
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
    const fileStructureTable = document.getElementById("file-structure");
    fileStructureTable.innerHTML = ""; // Clear the previous file structure
  
    let currentNode = this.head;
  
    // Create the table header
    const tableHeaderRow = document.createElement("tr");
  
    const fileNameHeader = document.createElement("th");
    fileNameHeader.textContent = "File Name";
    tableHeaderRow.appendChild(fileNameHeader);
  
    const fileSizeHeader = document.createElement("th");
    fileSizeHeader.textContent = "File Size ";
    tableHeaderRow.appendChild(fileSizeHeader);
  
    const indexBlocksHeader = document.createElement("th");
    indexBlocksHeader.textContent = "Index Blocks ";
    tableHeaderRow.appendChild(indexBlocksHeader);
  
    fileStructureTable.appendChild(tableHeaderRow);
  
    // Create table rows for each file
    while (currentNode) {
      const fileRow = document.createElement("tr");
  
      const fileNameCell = document.createElement("td");
      fileNameCell.textContent = currentNode.name;
      fileRow.appendChild(fileNameCell);
  
      const fileSizeCell = document.createElement("td");
      fileSizeCell.textContent = currentNode.size;
      fileRow.appendChild(fileSizeCell);
  
      const indexBlocksCell = document.createElement("td");
  
      let indexNode = currentNode.index.head;
      while (indexNode) {
        const blockNumberDiv = document.createElement("div");
        blockNumberDiv.textContent = `Block Number: ${indexNode.blockNumber}`;
        blockNumberDiv.classList.add("block-number");
  
        indexBlocksCell.appendChild(blockNumberDiv);
        indexNode = indexNode.next;
      }
  
      fileRow.appendChild(indexBlocksCell);
  
      fileStructureTable.appendChild(fileRow);
  
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

