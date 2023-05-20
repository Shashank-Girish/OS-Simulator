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
      let currentNode = this.head;
      while (currentNode) {
        console.log(`File: ${currentNode.name}, Size: ${currentNode.size}`);
        console.log(`Index Blocks:`);
        let indexNode = currentNode.index.head;
        while (indexNode) {
          console.log(`Block Number: ${indexNode.blockNumber}`);
          indexNode = indexNode.next;
        }
        currentNode = currentNode.next;
      }
    }
  }
  
  // Usage example:
  const diskSize = 50; // Total disk size of 50 units
  const fileList = new LinkedList(diskSize);
  
  fileList.insertFile("file1.txt", 10);
  fileList.insertFile("file2.txt", 20);
  fileList.insertFile("file3.txt", 15);
  
  fileList.displayFiles();
  
  fileList.allocateFile("file4.txt", 12);
  fileList.allocateFile("file2.txt", 20);
  fileList.allocateFile("file5.txt", 25); // This file will not fit due to insufficient disk space
  
  fileList.displayFiles();
  