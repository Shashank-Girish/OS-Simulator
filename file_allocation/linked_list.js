class FileNode {
    constructor(name, size) {
      this.name = name;
      this.size = size;
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
      const newNode = new FileNode(name, size);
  
      if (this.usedSpace + size > this.diskSize) {
        console.log(`Insufficient disk space to insert file '${name}'.`);
        return;
      }
  
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
  
    allocateFile(name, size) {
      let currentNode = this.head;
      let previousNode = null;
      while (currentNode) {
        if (currentNode.name === name) {
          console.log(`File '${name}' already exists.`);
          return;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
  
      if (this.usedSpace + size > this.diskSize) {
        console.log(`Insufficient disk space to allocate file '${name}'.`);
        return;
      }
  
      const newNode = new FileNode(name, size);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        previousNode.next = newNode;
      }
  
      this.usedSpace += size;
      console.log(`Allocated file '${name}' with size ${size}.`);
    }
  
    displayFiles() {
      let currentNode = this.head;
      while (currentNode) {
        console.log(`File: ${currentNode.name}, Size: ${currentNode.size}`);
        currentNode = currentNode.next;
      }
    }
  }
  

  const diskSize = 50; 
  const fileList = new LinkedList(diskSize);
  
  fileList.insertFile("file1.txt", 10);
  fileList.insertFile("file2.txt", 20);
  fileList.insertFile("file3.txt", 15);
  
  fileList.displayFiles();
  
  fileList.allocateFile("file4.txt", 12);
  fileList.allocateFile("file2.txt", 20);
  fileList.allocateFile("file5.txt", 25); 
  
  fileList.displayFiles();
  