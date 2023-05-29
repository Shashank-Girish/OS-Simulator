class FileNode {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.start = null;
    this.end = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(diskSize) {
    this.head = null;
    this.diskSize = diskSize;
    this.usedSpace = 0;
    this.blockedBlocks = new Set();
  }

  insertFile(name, size) {
    const newNode = new FileNode(name, size);
  
    if (this.usedSpace + size > this.diskSize) {
      console.log(`Insufficient disk space to insert file '${name}'.`);
      return;
    }
  
    let startBlock = 0;
    let endBlock = size - 1;
    let currentNode = this.head;
    
    while (currentNode) {
      if (currentNode.start <= endBlock && currentNode.end >= startBlock) {
        console.log(`Cannot insert file '${name}'. Overlaps with existing file '${currentNode.name}'.`);
        return;
      }
      
      currentNode = currentNode.next;
    }
  
    for (let i = startBlock; i <= endBlock; i++) {
      if (this.blockedBlocks.has(i)) {
        console.log(`Cannot insert file '${name}'. Block ${i} is blocked.`);
        return;
      }
    }
  
    if (!this.head) {
      newNode.start = startBlock;
      newNode.end = endBlock;
      this.head = newNode;
    } else {
      currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      const prevEnd = currentNode.end;
      newNode.start = prevEnd + 1;
      newNode.end = prevEnd + size;
      currentNode.next = newNode;
    }
  
    this.usedSpace += size;
    console.log(`Inserted file '${name}' with size ${size}.`);
  }
  

  allocateFile(name, size) {
    let currentNode = this.head;
    let previousNode = null;
    let startBlock = 0;
    
    // Find the available range for the new file
    while (currentNode) {
      if (currentNode.start - startBlock >= size) {
        // Found a gap between files, allocate the new file here
        break;
      }
      startBlock = currentNode.end + 1;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    
    if (startBlock + size > this.diskSize) {
      console.log(`Insufficient disk space to allocate file '${name}'.`);
      return;
    }
  
    const newNode = new FileNode(name, size);
    
    if (!this.head) {
      newNode.start = 0;
      newNode.end = size - 1;
      this.head = newNode;
    } else if (!previousNode) {
      // Allocate the new file before the first file
      const nextStart = this.head.start;
      newNode.start = startBlock;
      newNode.end = startBlock + size - 1;
      newNode.next = this.head;
      this.head = newNode;
  
      // Update the range of the next file
      this.head.next.start = newNode.end + 1;
    } else if (!currentNode) {
      // Allocate the new file at the end of the disk
      const prevEnd = previousNode.end;
      newNode.start = prevEnd + 1;
      newNode.end = prevEnd + size;
      previousNode.next = newNode;
    } else {
      // Allocate the new file between two existing files
      const prevEnd = previousNode.end;
      const nextStart = currentNode.start;
      newNode.start = startBlock;
      newNode.end = startBlock + size - 1;
      newNode.next = currentNode;
      previousNode.next = newNode;
  
      // Update the range of the next file
      newNode.next.start = newNode.end + 1;
    }
  
    this.usedSpace += size;
    console.log(`Allocated file '${name}' with size ${size}.`);
  }
  

  blockBlocks(start, end) {
  for (let i = start; i <= end; i++) {
    this.blockedBlocks.add(i);
  }

  // Calculate the number of blocked blocks within the specified range
  const blockedSpace = end - start + 1;

  // Update the used space by subtracting the blocked space
  this.usedSpace += blockedSpace;

  console.log(`Blocked blocks from ${start} to ${end}.`);
  console.log(`Updated used space: ${this.usedSpace}/${this.diskSize}`);
}


  displayFiles() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(
        `File: ${currentNode.name}, Size: ${currentNode.size}, Range: ${currentNode.start}-${currentNode.end}`
      );
      currentNode = currentNode.next;
    }
  }
  
  displayFileBlocks(name) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.name === name) {
        console.log(`File: ${currentNode.name}, Range: ${currentNode.start}-${currentNode.end}`);
        return;
      }
      currentNode = currentNode.next;
    }
    console.log(`File '${name}' not found.`);
  }
}

const diskSize = 50;
const fileList = new LinkedList(diskSize);

function blocksBlocks() {
  const startBlock = parseInt(document.getElementById("startBlock").value);
  const endBlock = parseInt(document.getElementById("endBlock").value);
  
  if (isNaN(startBlock) || isNaN(endBlock) || startBlock < 0 || endBlock < 0 || startBlock > endBlock) {
    alert("Invalid block range. Please enter valid block numbers.");
    return;
  }

  fileList.blockBlocks(startBlock, endBlock);
  document.getElementById("blockForm").reset();

}

function insertsFile() {
  const fileName = document.getElementById("fileName").value.trim();
  const fileSize = parseInt(document.getElementById("fileSize").value);

  if (fileName === "" || isNaN(fileSize) || fileSize < 1) {
    alert("Invalid file name or size. Please enter valid values.");
    return;
  }

  fileList.allocateFile(fileName, fileSize);
  document.getElementById("fileForm").reset();

}

function displaysFiles() {
  const fileTable = document.getElementById("file-structure");

  while (fileTable.rows.length > 1) {
    fileTable.deleteRow(-1);
  }

  let currentNode = fileList.head;
  while (currentNode) {
    const row = fileTable.insertRow();
    const nameCell = row.insertCell();
    const sizeCell = row.insertCell();
    const rangeCell = row.insertCell();

    nameCell.textContent = currentNode.name;
    sizeCell.textContent = currentNode.size;
    rangeCell.textContent = `${currentNode.start}-${currentNode.end}`;

    currentNode = currentNode.next;
  }
}